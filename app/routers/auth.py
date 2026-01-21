from fastapi import FastAPI
from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
async def login():
    return {"message": "Login endpoint"}

@router.get("/test-auth")
async def test_auth():
    return {"message": "Test auth endpoint"}