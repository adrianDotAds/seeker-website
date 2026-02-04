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

# CORS configuration
origins = (
    "http://localhost",
    "http://localhost:8086",
    "http://localhost:5173",
    "http://10.10.20.198:8086",
    "http://192.168.254.100:8086",
    "http://127.0.0.1:8086"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
# app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(auth.router, prefix="", tags=["Authentication"])
# app.include_router(user.router, prefix="", tags=["User Management"])

# Templates directory setup
templates = Jinja2Templates(directory="app/templates")

@app.post("/test-main")
async def test_main(data: dict = {}):
    print("Main endpoint accessed with data:", data)
    return {"message": "Main endpoint is working!  ", "data": data}

@app.get("/", tags=["Root"])
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