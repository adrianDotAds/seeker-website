# main.py

# FastAPI imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# For template rendering (if needed). To load HTML templates
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

# Importing the Supabase client and user authentication dependency
from app.db import supabase

# Import routers
from app.routers import *

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(auth.router, prefix="", tags=["Authentication"])
app.include_router(user.router, prefix="", tags=["User Management"])

# Templates directory setup
templates = Jinja2Templates(directory="app/templates")

# Define the origins that are allowed to talk to your API
origins = [
    "http://localhost:5173",  # Vite default
    "http://127.0.0.1:5173",
]

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],    # Allows GET, POST, OPTIONS, etc.
    allow_headers=["*"],    # Allows custom headers like Authorization
)

@app.get("/test-main")
async def test_main():
    return {"message": "Main endpoint is working!"}

@app.get("/log", tags=["Root"])
async def root():
    print("Rendering index.html template")
    return templates.TemplateResponse("index.html", {"request": {}})

@app.get("/sign-up")
async def sign_up():
    print("Rendering sign-up.html template")
    return templates.TemplateResponse("sign-up.html", {"request": {}})

@app.get("/add-member")
async def add_member():
    print("Rendering add-member.html template")
    return templates.TemplateResponse("add-member.html", {"request": {}})