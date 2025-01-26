import datetime
from typing import Dict, List
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import logging

from pydantic import BaseModel

from app.services.ai_service import analyze_network_logs
from sse_starlette.sse import EventSourceResponse
import asyncio

logged_data = []
sse_stream = []  # Store SSE messages

app = FastAPI()
logged_data = []

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define allowed origins (you can specify '*' to allow all origins, but it's not recommended for production)
origins = [
    "http://localhost:3000",  # React app running on localhost
    # Add other origins as needed
]

# Add CORS middleware to your FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy functions for the endpoints
def get_real_time_network_metrics():
    return {"bandwidth_usage": 75, "latency": 20, "packet_loss": 1.5}

def get_ai_insights():
    return {"insights": "Increase bandwidth for optimal performance"}

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
def log_ai_data(network_data: Dict):
    log_entry = {
        "bandwidth": network_data["bandwidth"],
        "latency": network_data["latency"],
        "packetLoss": network_data["packetLoss"],
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    logged_data.append(log_entry)
    sse_stream.append(log_entry)  

# Endpoint to log network data
@app.post("/api/log-network-ai-data")
async def log_network_data_endpoint(request: NetworkAnalysisRequest):
    try:
        logger.debug(f"Received network log data: {request.dict()}")

        # Log the network data
        log_ai_data(request.dict())

        return {"status": "success", "message": "Network data logged successfully"}
    except Exception as e:
        logger.error(f"Error in /api/log-network-data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
# SSE Endpoint to stream network data to the frontend
@app.get("/api/stream-network-data")
async def stream_network_data(request: Request):
    async def event_generator():
        while True:
            if await request.is_disconnected():
                logger.info("Client disconnected")
                break

            if sse_stream:
                # Send the latest log entry to the client
                log_entry = sse_stream.pop(0)
                yield {
                    "event": "network_data",
                    "data": log_entry
                }

            await asyncio.sleep(1)  # Adjust the delay as needed

    return EventSourceResponse(event_generator())
# Function to log network data
def log_network_data(network_data: Dict):
    logged_data.append({
        "bandwidth": network_data["bandwidth"],
        "latency": network_data["latency"],
        "packetLoss": network_data["packetLoss"],
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)