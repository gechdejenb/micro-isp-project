from fastapi import APIRouter
from app.services.ai_service import analyze_network_logs  # Absolute import

router = APIRouter()

@router.get("/predict")
async def predict():
    result = analyze_network_logs("Sample network logs")
    return {"prediction": result}