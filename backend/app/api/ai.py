from app.services.blockchain_service import BlockchainService

blockchain = BlockchainService()

@router.post("/predict-peak-usage")
async def predict_peak_usage(data: dict):
    predictions = optimizer.predict_peak_usage(data)
    # Allocate bandwidth based on predictions
    for user, amount in predictions.items():
        blockchain.allocate_bandwidth(user, amount)
    return {"message": "Bandwidth allocated successfully"}