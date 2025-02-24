import datetime
from typing import Dict, List
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import logging
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse
import asyncio

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS middleware
origins = ["http://localhost:5173"]  # Add your frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logged_data = []
sse_stream = []

# Dummy functions for the endpoints
def get_real_time_network_metrics():
    return {"bandwidth_usage": 75, "latency": 20, "packet_loss": 1.5}

def get_ai_insights():
    return {"insights": "Increase bandwidth for optimal performance"}

# Mock function to simulate fetching logged data
def get_logged_data() -> List[Dict]:
    return logged_data

# Pydantic model for request/response
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

        # Call the AI service (replace with actual logic)
        analysis = {"insights": "Sample analysis"}  # Replace with actual AI analysis
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)