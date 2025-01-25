from fastapi import APIRouter
from app.services.ai_service import analyze_network_logs

router = APIRouter()

@router.post("/analyze-network")
async def analyze_network(logs: str):
    result = analyze_network_logs(logs)
    return {"analysis": result}