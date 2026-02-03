# app/routers/user.py

# imports for FastAPI router
from fastapi import APIRouter, Depends, Request

# HTML response and redirection
from fastapi.responses import HTMLResponse

# Dependency to get current user
from app import dependencies

# For template rendering (if needed). To load HTML templates
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")

@router.get("/test-user")
async def test_user():
    return {"message": "Test user endpoint"}