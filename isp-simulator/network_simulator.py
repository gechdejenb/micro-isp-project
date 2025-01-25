from mininet.topo import Topo
from mininet.net import Mininet
from mininet.cli import CLI
from mininet.log import setLogLevel
import time
import requests
from ic.client import Client
from ic.identity import Identity
from ic.agent import Agent

# Initialize ICP client
identity = Identity()
client = Client()
agent = Agent(identity, client)
canister_id = "your-canister-id"  
# Define the network topology
class ISPNetworkTopo(Topo):
    def __init__(self):
        Topo.__init__(self)

        # Add core router
        core_router = self.addSwitch('cr1')

        # Add distribution switches
        dist_switch1 = self.addSwitch('ds1')
        dist_switch2 = self.addSwitch('ds2')

        # Connect distribution switches to the core router
        self.addLink(dist_switch1, core_router)
        self.addLink(dist_switch2, core_router)

        # Add access switches
        access_switch1 = self.addSwitch('as1')
        access_switch2 = self.addSwitch('as2')

        # Connect access switches to distribution switches
        self.addLink(access_switch1, dist_switch1)
        self.addLink(access_switch2, dist_switch2)

        # Add hosts
        server1 = self.addHost('server1', ip='10.0.0.1/24')
        user1 = self.addHost('user1', ip='10.0.0.2/24')
        user2 = self.addHost('user2', ip='10.0.0.3/24')
        user3 = self.addHost('user3', ip='10.0.1.2/24')
        user4 = self.addHost('user4', ip='10.0.1.3/24')

        # Connect hosts to access switches
        self.addLink(server1, access_switch1)
        self.addLink(user1, access_switch1)
        self.addLink(user2, access_switch1)
        self.addLink(user3, access_switch2)
        self.addLink(user4, access_switch2)

def allocate_bandwidth(net, user: str, amount: int):
    """
    Allocate bandwidth for a specific user using ICP and Mininet.
    """
    try:
        # Call the canister's allocateBandwidth method
        agent.update(canister_id, "allocateBandwidth", {"user": user, "amount": amount})
        print(f"Allocated {amount} Mbps to {user} via ICP.")

        # Apply bandwidth allocation using Linux Traffic Control (tc)
        user_node = net.get(user)
        user_node.cmd(f'tc qdisc change dev {user}-eth0 root tbf rate {amount}mbit burst 32kbit latency 400ms')
        print(f"Applied {amount} Mbps to {user} using Mininet.")
    except Exception as e:
        print(f"Failed to allocate bandwidth for {user}: {e}")

def simulate_bandwidth_peaks(net):
    """
    Simulate bandwidth peaks and interact with AI and ICP.
    """
    # Start iperf server on server1
    server1 = net.get('server1')
    server1.cmd('iperf -s &')  # Run iperf server in the background

    # Gradually increase bandwidth usage from low to high
    for bandwidth in range(1, 11):  # Simulate bandwidth from 1 Mbps to 10 Mbps
        print(f"\nSimulating bandwidth: {bandwidth} Mbps")

        # Start iperf client on user1 to generate traffic
        user1 = net.get('user1')
        user1.cmd(f'iperf -c 10.0.0.1 -t 10 -b {bandwidth}M &')  # Run for 10 seconds

        # Collect network data (e.g., bandwidth usage, latency)
        network_data = {
            "bandwidth": bandwidth,
            "latency": 10,  # Simulated latency
            "packetLoss": 0.1  # Simulated packet loss
        }

        # Send network data to the backend for AI analysis
        try:
            ai_response = requests.post(
                "http://localhost:8000/api/analyze-network",
                json={"logs": network_data}
            ).json()
            print("AI Optimization Suggestion:", ai_response.get("analysis", "No suggestion"))
        except Exception as e:
            print(f"Failed to send data to AI service: {e}")

        # Log network data to ICP
        try:
            requests.post(
                "http://localhost:8000/api/log-network-data",
                json=network_data
            )
            print("Network data logged to ICP.")
        except Exception as e:
            print(f"Failed to log network data to ICP: {e}")

        # Apply AI's bandwidth allocation suggestions
        if "increase bandwidth" in ai_response.get("analysis", "").lower():
            allocate_bandwidth(net, "user1", 20)  # Allocate 20 Mbps to user1

        # Wait for the current bandwidth simulation to complete
        time.sleep(10)

    print("\nBandwidth peak simulation complete.")

if __name__ == '__main__':
    setLogLevel('info')  # Set Mininet log level
    topo = ISPNetworkTopo()
    net = Mininet(topo)
    net.start()

    # Configure IP routes (optional, for multi-subnet setups)
    net['server1'].cmd('ip route add 10.0.1.0/24 via 10.0.0.254')
    net['user3'].cmd('ip route add 10.0.0.0/24 via 10.0.1.254')

    # Simulate bandwidth peaks
    simulate_bandwidth_peaks(net)

    # Start Mininet CLI for interaction
    CLI(net)

    # Stop the network after exiting the CLI
    net.stop()