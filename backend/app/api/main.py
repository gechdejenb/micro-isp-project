from fastapi import APIRouter
from app.api.ai import router as ai_router  # Absolute import

router = APIRouter()
router.include_router(ai_router, prefix="/ai")