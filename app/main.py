# main.py

# FastAPI imports
from fastapi import FastAPI

# For template rendering (if needed). To load HTML templates
from fastapi.templating import Jinja2Templates

# Importing the Supabase client and user authentication dependency
from app.db import supabase

# Import routers
from app.routers import *

app = FastAPI()

app.include_router(auth.router, prefix="", tags=["Authentication"])
app.include_router(user.router, prefix="", tags=["User Management"])

# Templates directory setup
templates = Jinja2Templates(directory="app/templates")

@app.get("/test-main")
async def test_main():
    return {"message": "Main endpoint is working!"}

@app.get("/", tags=["Root"])
async def root():
    print("Rendering index.html template")
    return templates.TemplateResponse("index.html", {"request": {}})