# backend/app/services/icp_service.py
from ic.client import Client
from ic.identity import InternetIdentity
from ic.agent import Agent

# Initialize ICP client
identity = InternetIdentity()
client = Client()
agent = Agent(identity, client)

# Replace with your canister ID
canister_id = "your_canister_id"
bandwidth_canister = agent.get_canister(canister_id)

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