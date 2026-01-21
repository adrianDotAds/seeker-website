# main.py

# FastAPI imports
from fastapi import FastAPI

# For template rendering (if needed). To load HTML templates
from fastapi.templating import Jinja2Templates

# Importing the Supabase client and user authentication dependency
from app.db import supabase

# Setup logging
import logging

app = FastAPI()

# Templates directory setup
templates = Jinja2Templates(directory="app/templates")

# Setup logging configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

@app.get("/test-main")
async def test_main():
    logger.info("Test main endpoint called.")
    return {"message": "Main endpoint is working!"}

@app.get("/", tags=["Root"])
async def root():
    return templates.TemplateResponse("index.html", {"request": {}})