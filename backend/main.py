from fastapi import FastAPI
from app.api.main import router as api_router  # Absolute import

app = FastAPI()
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Micro ISP Backend is running"}