# main.py

# FastAPI imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# For template rendering (if needed). To load HTML templates
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

# Importing the Supabase client and user authentication dependency
from api.db import supabase

# Import routers
from api.routers import *

# Import configuration settings
from api.config import IPWhitelist

app = FastAPI()

ip_storage = IPWhitelist().allowed_ips

# CORS configuration
origins = (
    ip.strip() for ip in ip_storage if ip.strip()  # Ensure we only include non-empty IPs  
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
app.include_router(user.router, prefix="", tags=["User Management"])
app.include_router(getEvents.router, prefix="", tags=["Event Management"])

# Templates directory setup
templates = Jinja2Templates(directory="app/templates")

@app.post("/test-main")
async def test_main():
    print("Main endpoint accessed with data:", origins)

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

# Non existing route handler
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    print(f"Attempted access to non-existing route: /{full_path}")
    return {"message": f"The route '/{full_path}' does not exist."}