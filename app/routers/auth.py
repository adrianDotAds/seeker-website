# app/routers/auth.py

# imports for FastAPI router
from fastapi import APIRouter

# imports for form data handling
from fastapi import Form

router = APIRouter()

@router.post("/login")
async def login(
    email: str = Form(...),
    password: str = Form(...),
    seeker_id: str = Form(...)
):
    print(f"Login attempt with email: {email}, seeker_id: {seeker_id}")
    return {"message": "Login endpoint"}

@router.get("/test-auth")
async def test_auth():
    return {"message": "Test auth endpoint"}