from mininet.topo import Topo
from mininet.net import Mininet
from mininet.cli import CLI
from mininet.log import setLogLevel, info
import os
import asyncio
import requests
from ic.client import Client
from ic.identity import Identity
from ic.agent import Agent
from ic.candid import Types, encode, decode
from ic.principal import Principal

# DFX Configuration
DFX_NETWORK = "http://localhost:4943"
CANISTER_ID = Principal.from_str("bkyz2-fmaaa-aaaaa-qaaaq-cai")

# Initialize DFX Agent
identity = Identity()
client = Client(url=DFX_NETWORK)
agent = Agent(identity, client)

class ISPNetworkTopo(Topo):
    def __init__(self):
        super().__init__()
        # Core Layer
        core_router = self.addSwitch('cr1')
        
        # Distribution Layer
        dist_switch1 = self.addSwitch('ds1')
        dist_switch2 = self.addSwitch('ds2')
        self.addLink(dist_switch1, core_router)
        self.addLink(dist_switch2, core_router)
        
        # Access Layer
        access_switch1 = self.addSwitch('as1')
        access_switch2 = self.addSwitch('as2')
        self.addLink(access_switch1, dist_switch1)
        self.addLink(access_switch2, dist_switch2)
        
        # Hosts
        self.addHost('server1', ip='10.0.0.1/24')  # Main server
        self.addHost('user1', ip='10.0.0.2/24')    # Regular user 1
        self.addHost('user2', ip='10.0.0.3/24')    # Regular user 2
        self.addHost('user3', ip='10.0.1.2/24')    # Regular user 3
        self.addHost('user4', ip='10.0.1.3/24')    # Regular user 4
        
        # Critical Services
        self.addHost('edu', ip='10.0.2.1/24')  # Education service (shortened name)
        self.addHost('health', ip='10.0.2.2/24')     # Health service
        self.addHost('public', ip='10.0.2.3/24')  # Public service (shortened name)
        
        # Connections
        self.addLink('server1', access_switch1)
        self.addLink('user1', access_switch1)
        self.addLink('user2', access_switch1)
        self.addLink('user3', access_switch2)
        self.addLink('user4', access_switch2)
        self.addLink('edu', access_switch1)  # Connect education service
        self.addLink('health', access_switch1)     # Connect health service
        self.addLink('public', access_switch2)  # Connect public service

def allocate_bandwidth(net: Mininet, user: str, amount: int) -> None:
    """Apply bandwidth limits using Linux tc."""
    try:
        node = net.get(user)
        iface = f"{user}-eth0"
        node.cmd(f'tc qdisc del dev {iface} root || true')
        node.cmd(f'tc qdisc add dev {iface} root tbf rate {amount}mbit burst 32kbit latency 400ms')
        info(f"Allocated {amount}Mbps to {user}\n")
    except Exception as e:
        info(f"Bandwidth allocation error for {user}: {str(e)}\n")

def encode_bandwidth_data(bandwidth: int) -> bytes:
    """
    Encode bandwidth data into a Candid format.
    """
    # Define the parameters for encoding
    params = [
        {"type": Types.Nat, "value": bandwidth}  # Bandwidth as Nat
    ]

    # Encode the parameters using the provided encode function
    try:
        encoded_data = encode(params)
        return encoded_data
    except ValueError as e:
        raise ValueError(f"Encoding failed: {e}")
    except TypeError as e:
        raise TypeError(f"Type mismatch during encoding: {e}")


async def send_to_ai_service(bandwidth: int) -> str:
    """Send bandwidth data to the AI service for analysis and log it to the backend."""
    try:
        # Prepare payload for AI analysis
        payload = {
            "bandwidth": bandwidth,
            "latency": 20,  # Example latency value
            "packetLoss": 0.1  # Example packet loss value
        }

        # Send data to AI service for analysis
        response = requests.post(
            "http://localhost:8000/api/analyze-network",
            json=payload,  # Send the payload as JSON
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Log the network data to the backend
        log_response = requests.post(
            "http://localhost:8000/api/log-network-ai-data",
            json=payload,  # Send the same payload to log
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        log_response.raise_for_status()  

        return response.json().get("analysis", "")
    except requests.RequestException as e:
        info(f"AI Service or Logging Error: {str(e)}\n")
        return ""

async def log_to_dfx_canister(bandwidth: int) -> None:
    """Log bandwidth data to the DFX canister."""
    try:
        encoded_args = encode_bandwidth_data(bandwidth)
        response = await asyncio.wait_for(
            agent.update_raw(
                CANISTER_ID,
                "logNetworkData",
                encoded_args
            ),
            timeout=30
        )
        
        if 'reply' in response:
            decoded = decode([Types.Text], bytes(response['reply']['arg']))[0]
            info(f"DFX Success: {decoded}\n")
        elif 'reject' in response:
            info(f"DFX Rejected: {response['reject']['message']}\n")
        else:
            info(f"DFX Unknown Response: {response}\n")
            
    except asyncio.TimeoutError:
        info("DFX Timeout: Request took too long\n")
    except Exception as e:
        # Convert CANISTER_ID to string before logging
        canister_id_str = CANISTER_ID.to_str()
        # info(f"DFX Communication Error with canister {canister_id_str}: {str(e)}\n")

async def simulate_bandwidth_peaks(net: Mininet) -> None:
    """Main simulation loop with DFX integration."""
    server = net.get('server1')
    server.cmd('iperf -s &')
    
    # Define critical services (use the same names as in the topology)
    critical_services = ['edu', 'health', 'public']  # Updated to match host names
    
    for bw in range(1, 11):
        info(f"\n=== Testing {bw}Mbps ===\n")
        
        # Generate traffic for regular users
        for user in ['user1', 'user2', 'user3', 'user4']:
            net.get(user).cmd(f'iperf -c 10.0.0.1 -t 10 -b {bw}M &')
        
        # Allocate higher bandwidth to critical services during peak times
        if bw >= 5:  # Simulate peak time (e.g., after 5 Mbps)
            for service in critical_services:
                allocate_bandwidth(net, service, bw * 2)  # Double bandwidth for critical services
        
        # AI Analysis
        analysis = await send_to_ai_service(bw)
        if analysis:
            info(f"AI Recommendation: {analysis}\n")
        
        # DFX Canister Logging
        await log_to_dfx_canister(bw)
        
        # Bandwidth adjustment based on AI analysis
        if analysis:
            new_bw = bw
            if "increase" in analysis.lower():
                new_bw = min(bw + 5, 100)
                info(f"Increasing bandwidth to {new_bw}Mbps\n")
            elif "decrease" in analysis.lower():
                new_bw = max(bw - 2, 1)
                info(f"Decreasing bandwidth to {new_bw}Mbps\n")
            
            if new_bw != bw:
                allocate_bandwidth(net, "user1", new_bw)
        
        await asyncio.sleep(10)

async def main() -> None:
    """Main entry point for the simulation."""
    os.system('mn -c')
    setLogLevel('info')
    
    # Create network
    net = Mininet(topo=ISPNetworkTopo())
    net.start()
    
    # Configure network routes
    net['server1'].cmd('ip route add 10.0.1.0/24 via 10.0.0.254')
    net['user3'].cmd('ip route add 10.0.0.0/24 via 10.0.1.254')
    
    try:
        await simulate_bandwidth_peaks(net)
    finally:
        CLI(net)
        net.stop()

if __name__ == '__main__':
    asyncio.run(main())