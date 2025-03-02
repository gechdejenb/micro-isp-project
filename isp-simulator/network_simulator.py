#!/usr/bin/env python3

"""
MicroISP Network Simulator with Real-time Updates and AI Analysis
-----------------------------------------------------------------
This script simulates network traffic with various load profiles
and communicates in real-time with the MicroISP canister.
"""

import sys
import time
import random
import datetime
import json
import os
import threading
import requests
from colorama import init, Fore, Back, Style

# Install ic-py if not already installed
try:
    from ic.identity import Identity
    from ic.client import Client
    from ic.agent import Agent
    from ic.candid import encode, decode, Types
    from ic.principal import Principal
except ImportError:
    print("Installing ic-py library...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "ic-py", "--break-system-packages"])
    from ic.identity import Identity
    from ic.client import Client
    from ic.agent import Agent
    from ic.candid import encode, decode, Types
    from ic.principal import Principal

init()

CANISTER_ID = "6tml2-fyaaa-aaaad-qg6fq-cai"
REFRESH_INTERVAL = 2  
AI_API_KEY = "7b8f6a353c414afc9ffeca8973dba564" 
AI_API_URL = "https://api.aimlapi.com/v1/chat/completions" 

REGULAR_USERS = ["user1", "user2", "user3", "user4", "user5"]
PUBLIC_INSTITUTIONS = ["school1", "hospital1", "gov1", "library1"]
BUSINESS_USERS = ["business1", "business2", "business3"]

LOAD_PROFILES = {
    "LOW": {
        "bandwidth_range": (60, 100),
        "latency_range": (5, 30),
        "packet_loss_range": (0, 0.5),
        "color": Fore.GREEN,
        "desc": "Optimal network conditions"
    },
    "MEDIUM": {
        "bandwidth_range": (30, 70),
        "latency_range": (30, 80),
        "packet_loss_range": (0.5, 2.0),
        "color": Fore.YELLOW,
        "desc": "Moderate congestion"
    },
    "BUSY": {
        "bandwidth_range": (10, 40),
        "latency_range": (80, 150),
        "packet_loss_range": (2.0, 5.0),
        "color": Fore.RED,
        "desc": "Heavy congestion"
    },
    "FAILED": {
        "bandwidth_range": (0, 15),
        "latency_range": (150, 300),
        "packet_loss_range": (5.0, 15.0),
        "color": Fore.MAGENTA,
        "desc": "Critical network issues"
    }
}

class NetworkLink:
    """Simulated network link between nodes."""
    def __init__(self, source, target, capacity=100):
        self.source = source
        self.target = target
        self.capacity = capacity  
        self.utilization = 0      
        self.packet_loss = 0.0    
        self.latency = 0           
        self.load_profile = "LOW" 
        self.set_load_profile("LOW")  
    
    def set_load_profile(self, profile):
        """Set the load profile for this link."""
        if profile in LOAD_PROFILES:
            self.load_profile = profile
            self.apply_load_profile()
            return True
    
    def apply_load_profile(self):
        """Apply the current load profile to the link metrics."""
        profile = LOAD_PROFILES[self.load_profile]
        
        max_bandwidth = self.capacity
        min_utilization = int(max_bandwidth * (1 - profile["bandwidth_range"][1] / 100))
        max_utilization = int(max_bandwidth * (1 - profile["bandwidth_range"][0] / 100))
        
        self.utilization = random.randint(min_utilization, max_utilization)
        self.packet_loss = random.uniform(profile["packet_loss_range"][0], profile["packet_loss_range"][1])
        self.latency = random.randint(profile["latency_range"][0], profile["latency_range"][1])
    
    def add_traffic(self, traffic):
        """Add traffic to the link and return actual throughput."""
        available = self.capacity - self.utilization
        actual = min(traffic, available)
        self.utilization += actual
        return actual
    
    def remove_traffic(self, traffic):
        """Remove traffic from the link."""
        self.utilization = max(0, self.utilization - traffic)

class NetworkNode:
    """Simulated network node (switch, router or host)."""
    def __init__(self, name, node_type="host"):
        self.name = name
        self.type = node_type
        self.links = []
        self.bandwidth_allocation = 0
    
    def add_link(self, link):
        """Add a link to this node."""
        self.links.append(link)

class ICClient:
    """Internet Computer client using ic-py."""
    
    def __init__(self, canister_id):
        self.identity = Identity()  
        self.client = Client(url="https://ic0.app")  
        self.agent = Agent(self.identity, self.client)  
        self.canister_id = canister_id
    
    def call_update(self, method_name, args):
        """Call an update method on the canister."""
        try:
            params = []
            if method_name == "log_network_data":
                params = [
                    {'type': Types.Nat, 'value': args[0]},  # bandwidth
                    {'type': Types.Nat, 'value': args[1]},  # latency
                    {'type': Types.Float64, 'value': args[2]}  # packet_loss
                ]
            elif method_name == "allocate_bandwidth":
                params = [
                    {'type': Types.Text, 'value': args[0]},  # user
                    {'type': Types.Nat, 'value': args[1]}   # base_bandwidth
                ]
            return self.agent.update_raw(self.canister_id, method_name, encode(params))
        except Exception as e:
            print(f"Error calling {method_name}: {e}")
            return None
    
    def call_query(self, method_name, args=None):
        """Call a query method on the canister."""
        try:
            return self.agent.query_raw(self.canister_id, method_name, encode(args) if args else encode([]))
        except Exception as e:
            print(f"Error querying {method_name}: {e}")
            return None

class MicroISPNetworkSimulator:
    def __init__(self):
        self.nodes = {}
        self.links = []
        self.ic_client = ICClient(CANISTER_ID)  
        self.create_network_topology()
        self.start_real_time_updates()

    def create_network_topology(self):
        """Create a simple network topology."""
        self.nodes["server1"] = NetworkNode("server1", node_type="server")

        for user in REGULAR_USERS + PUBLIC_INSTITUTIONS + BUSINESS_USERS:
            self.nodes[user] = NetworkNode(user)

        for user in REGULAR_USERS:
            link = NetworkLink(self.nodes[user], self.nodes["server1"], capacity=100)
            self.nodes[user].add_link(link)
            self.links.append(link)

        for institution in PUBLIC_INSTITUTIONS:
            link = NetworkLink(self.nodes[institution], self.nodes["server1"], capacity=200)
            self.nodes[institution].add_link(link)
            self.links.append(link)

        for business in BUSINESS_USERS:
            link = NetworkLink(self.nodes[business], self.nodes["server1"], capacity=150)
            self.nodes[business].add_link(link)
            self.links.append(link)

    def start_real_time_updates(self):
        """Start a thread to fetch updates from the canister in real-time."""
        threading.Thread(target=self.fetch_updates, daemon=True).start()

    def fetch_updates(self):
        """Fetch updates from the canister at regular intervals."""
        while True:
            try:
                self.log_message("Fetching updates from the canister...")

                time.sleep(REFRESH_INTERVAL)
            except Exception as e:
                self.log_message(f"Error fetching updates: {e}")
                time.sleep(REFRESH_INTERVAL)

    def simulate_network_activity(self):
        """Simulate network activity and log data."""
        while True:
            for user in REGULAR_USERS + PUBLIC_INSTITUTIONS:
                load_profile = random.choice(list(LOAD_PROFILES.keys()))  
                profile = LOAD_PROFILES[load_profile]
                
                bandwidth = random.randint(profile["bandwidth_range"][0], profile["bandwidth_range"][1])
                latency = random.randint(profile["latency_range"][0], profile["latency_range"][1])
                packet_loss = random.uniform(profile["packet_loss_range"][0], profile["packet_loss_range"][1])
                
                self.log_network_data(bandwidth, latency, packet_loss)
                self.allocate_bandwidth(user, bandwidth)
                
                # Call the new AI analysis method
                ai_analysis_result = self.perform_ai_analysis(bandwidth, latency, packet_loss)
                self.log_message(f"AI Analysis Results: {ai_analysis_result}")
                
                if self.is_peak_hour():
                    self.log_message("Peak hour detected. Allocating more bandwidth for institutions.")
                    for institution in PUBLIC_INSTITUTIONS:
                        self.allocate_bandwidth(institution, bandwidth + 20)  # Increase allocation during peak hours
                else:
                    self.log_message("Non-peak hour detected. Allocating more bandwidth for slower users.")
                    for user in REGULAR_USERS:
                        if packet_loss > 2.0:  # If packet loss is high, allocate more bandwidth
                            self.allocate_bandwidth(user, bandwidth + 10)
                
                time.sleep(5) 

    def is_peak_hour(self):
        """Check if the current hour is a peak hour."""
        current_hour = datetime.datetime.now().hour
        return current_hour in range(8, 11) or current_hour in range(19, 22)  # Peak hours

    def log_message(self, message):
        """Print message with timestamp."""
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        print(f"[{timestamp}] {message}")

    def log_network_data(self, bandwidth: int, latency: int, packet_loss: float):
        """Log network data with all three parameters to the canister."""
        self.log_message(f"Logging network data with bandwidth {bandwidth}, latency {latency}, packet loss {packet_loss}...")
        result = self.ic_client.call_update("log_network_data", [bandwidth, latency, packet_loss])
        if result:
            self.log_message(f"Response: {result}")

    def allocate_bandwidth(self, user: str, base_bandwidth: int):
        """Allocate bandwidth to a user based on AI analysis."""
        self.log_message(f"Requesting bandwidth allocation for {user} with base bandwidth {base_bandwidth}...")
        result = self.ic_client.call_update("allocate_bandwidth", [user, base_bandwidth])
        if result:
            self.log_message(f"Response: {result}")

    def perform_ai_analysis(self, bandwidth, latency, packet_loss):
        """Perform AI analysis using the AIML API."""
        try:
            self.log_message(f"{Fore.CYAN}[AI API CALL]{Style.RESET_ALL} Calling AI service...")
            
            payload = {
                "model": "gpt-4",  
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a network optimization assistant. Analyze the provided network metrics and provide recommendations."
                    },
                    {
                        "role": "user",
                        "content": f"Analyze network: Bandwidth={bandwidth}Mbps, Latency={latency}ms, Packet Loss={packet_loss}%. Provide optimization recommendations."
                    }
                ],
                "max_tokens": 150,
                "temperature": 0.7
            }
            
            response = requests.post(
                url=f"{AI_API_URL}",
                headers={
                    "Authorization": f"Bearer {AI_API_KEY}",
                    "Content-Type": "application/json"
                },
                data=json.dumps(payload),
                timeout=10  
            )
            
            if response.status_code in [200, 201]:
                result = response.json()
                analysis = result['choices'][0]['message']['content']
                
                if len(analysis) > 500:
                    analysis_display = analysis[:500] + "..."
                else:
                    analysis_display = analysis
                
                self.log_message(f"{Fore.GREEN}[AI RESPONSE]{Style.RESET_ALL} {analysis_display}")
                return analysis
            else:
                self.log_message(f"{Fore.RED}[AI API ERROR]{Style.RESET_ALL} Status Code: {response.status_code}, Response: {response.text}")
                return self.generate_fallback_analysis(bandwidth, latency, packet_loss)
        
        except Exception as e:
            self.log_message(f"{Fore.RED}[AI ANALYSIS ERROR]{Style.RESET_ALL} {str(e)}")
            return self.generate_fallback_analysis(bandwidth, latency, packet_loss)
    def generate_fallback_analysis(self, bandwidth, latency, packet_loss):
        """Generate rule-based analysis when AI API fails."""
        self.log_message(f"{Fore.BLUE}[FALLBACK ANALYSIS]{Style.RESET_ALL} Using rule-based system")
        
        recommendations = []
        
        # Bandwidth recommendations
        if bandwidth < 20:
            recommendations.append(f"CRITICAL: Increase bandwidth allocation by at least 50% (current: {bandwidth}Mbps).")
        elif bandwidth < 40:
            recommendations.append(f"LOW BANDWIDTH: Consider increasing allocation by 25% (current: {bandwidth}Mbps).")
        else:
            recommendations.append(f"BANDWIDTH OK: Current allocation of {bandwidth}Mbps is sufficient.")
            
        # Latency recommendations
        if latency > 150:
            recommendations.append(f"HIGH LATENCY: Investigate network congestion issues (current: {latency}ms).")
        elif latency > 100:
            recommendations.append(f"MODERATE LATENCY: Monitor for potential congestion (current: {latency}ms).")
        else:
            recommendations.append(f"LATENCY OK: Current latency of {latency}ms is acceptable.")
            
        # Packet loss recommendations
        if packet_loss > 5:
            recommendations.append(f"HIGH PACKET LOSS: Consider network hardware upgrades or QoS settings (current loss: {packet_loss}%).")
        elif packet_loss > 2:
            recommendations.append(f"MODERATE PACKET LOSS: Monitor network performance and consider adjustments (current loss: {packet_loss}%).")
        else:
            recommendations.append(f"PACKET LOSS OK: Current loss of {packet_loss}% is within acceptable limits.")
        
        return "\n".join(recommendations)

def main():
    """Main function to run the simulator."""
    simulator = MicroISPNetworkSimulator()
    simulator.simulate_network_activity()

if __name__ == "__main__":
    main()