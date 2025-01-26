from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
from typing import List, Dict
import random
import datetime

from app.services.ai_service import analyze_network_logs

app = FastAPI()

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Mock data storage for logged network metrics
logged_data = []

# Mock function to simulate fetching real-time network metrics
def get_real_time_network_metrics() -> Dict:
    return {
        "bandwidth_usage": random.randint(50, 100),  # Simulated bandwidth usage (50-100 Mbps)
        "latency": random.randint(10, 50),          # Simulated latency (10-50 ms)
        "packet_loss": round(random.uniform(0.1, 2.0), 1)  # Simulated packet loss (0.1-2.0%)
    }

# Mock function to simulate fetching AI insights
def get_ai_insights() -> Dict:
    return {
        "recommendations": [
            "Increase bandwidth during peak hours (12:00 PM - 3:00 PM).",
            "Optimize routing for reduced latency."
        ],
        "predicted_peak_times": ["12:00 PM - 3:00 PM", "6:00 PM - 9:00 PM"]
    }

# Mock function to simulate fetching logged data
def get_logged_data() -> List[Dict]:
    return logged_data

# Define Pydantic models for request/response
class NetworkAnalysisRequest(BaseModel):
    bandwidth: int
    latency: int
    packetLoss: float

# Endpoint to fetch real-time network metrics
@app.get("/api/network-metrics")
def fetch_network_metrics():
    try:
        metrics = get_real_time_network_metrics()
        return metrics
    except Exception as e:
        logger.error(f"Error in /api/network-metrics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to fetch AI insights
@app.get("/api/ai-insights")
def fetch_ai_insights():
    try:
        insights = get_ai_insights()
        return insights
    except Exception as e:
        logger.error(f"Error in /api/ai-insights: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to fetch logged data
@app.get("/api/logged-data")
def fetch_logged_data():
    try:
        data = get_logged_data()
        return data
    except Exception as e:
        logger.error(f"Error in /api/logged-data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to analyze network data
@app.post("/api/analyze-network")
async def analyze_network(request: NetworkAnalysisRequest):
    try:
        logger.debug(f"Received network data: {request.dict()}")

        # Convert request to dict for analysis
        network_data = {
            "bandwidth": request.bandwidth,
            "latency": request.latency,
            "packetLoss": request.packetLoss
        }

        # Call the AI service with the correct data
        analysis = analyze_network_logs(network_data)
        logger.debug(f"Received AI analysis: {analysis}")

        # Log the network data
        log_network_data(network_data)

        return {"analysis": analysis}
    except Exception as e:
        logger.error(f"Error in /api/analyze-network: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Function to log network data
def log_network_data(network_data: Dict):
    logged_data.append({
        "bandwidth": network_data["bandwidth"],
        "latency": network_data["latency"],
        "packetLoss": network_data["packetLoss"],
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
