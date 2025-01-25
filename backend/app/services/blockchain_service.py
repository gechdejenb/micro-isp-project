from ic.client import Client
from ic.identity import Identity
from ic.agent import Agent
from ic.canister import Canister

# Initialize ICP client
identity = Identity()
client = Client()
agent = Agent(identity, client)

# Replace with your canister ID
canister_id = "bkyz2-fmaaa-aaaaa-qaaaq-cai"

# Create the canister instance
bandwidth_canister = Canister(agent, canister_id)

def allocate_bandwidth(user: str, amount: int):
    bandwidth_canister.allocateBandwidth(user, amount)

def log_network_data(bandwidth: int, latency: int, packet_loss: float):
    network_data = {
        "bandwidth": bandwidth,
        "latency": latency,
        "packetLoss": packet_loss
    }
    bandwidth_canister.logNetworkData(network_data)

def get_bandwidth(user: str) -> int:
    return bandwidth_canister.getBandwidth(user)

def get_network_logs() -> list:
    return bandwidth_canister.getNetworkLogs()
