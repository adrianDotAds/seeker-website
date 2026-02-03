# app/routers/auth.py

# imports for dependency to verify current user
import asyncio
from fastapi import Cookie

# Dependency to get current user
from app.dependencies import validate_token

# imports for FastAPI router
from fastapi import APIRouter, Depends

# imports for form data handling
from fastapi import Form
from fastapi.templating import Jinja2Templates

# Access to Supabase client if needed
from app.db import *

# HTML response, request and redirection
from fastapi.responses import JSONResponse, Response
from fastapi.requests import Request

# Schemas and models
from app.schemas import *

template = Jinja2Templates(directory="app/templates")

router = APIRouter()

@router.post("/login")
async def login(payload: LoginRequest, response: Response, request: Request):
    '''
    Docstring for login
    
    :param email: Email recorded by admin
    :type email: str
    :param password: Password created by user
    :type password: str
    :param seeker_id: Seeker ID provided by admin
    :type seeker_id: str
    '''
    print(request)
    email = payload.email
    password = payload.password
    seeker_id = payload.seeker_id
    
    # Check if Credentials are valid
    is_valid = await verify_seeker_credentials(seeker_id, email) # type: ignore
    print(f"Credentials valid: {is_valid}")
    if is_valid:
        try:
            # Login the user
            supabase = await get_supabase_client("anon") # type: ignore
            response = supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            print(f"Login response: {response}")
            # Create message response
            content = {
                "message": "Login successful",
                "user": response.user.user_metadata.get("first_name", "User"),
            }

            # Get cookie with access token
            try:
                response_obj = JSONResponse(content=content)
            except Exception as e:
                print("Error creating JSON response:", e)
                return JSONResponse(content={"message": "Internal server error"}, status_code=500)
            response_obj.set_cookie(
                key="access_token", 
                value=response.session.access_token,
                httponly=True,
                secure=False,
                samesite="lax",
                path="/",
                max_age=30 # 1 hour
            )
            response_obj.set_cookie(
                key="refresh_token", 
                value=response.session.refresh_token,
                httponly=True,
                secure=False,
                samesite="lax",
                path="/",
                max_age=3600 # 1 hour
            )
            print("Login successful, cookies set.")
            return response_obj
            # Perform login and return response
            # await login_user()
        except Exception as e:
            print(f"Error during login: {e}")
            return JSONResponse(content={"message": "Login failed"}, status_code=400)
    else:
        return JSONResponse(content={"message": "Invalid credentials"}, status_code=401)

@router.get("/users/me")
async def check_auth(
    access_token: str | None = Cookie(None), 
    refresh_token: str | None = Cookie(None), 
    request: Request = None # needed to get cookies
    ):

    try:
        # user = await validate_token(access_token, refresh_token, response=None)
        print(f"Checking auth with access_token: {access_token}, refresh_token: {refresh_token}")
        print(f'Request: {request}')
        print(f"Request headers: {request.headers}")
        print(f'Request cookies access_token: {request.cookies.get("access_token")}')
        user = await validate_token(access_token, refresh_token)
        print(f"Authenticated user: {user}")
        return {"user": user}  # type: ignore
    except Exception as e:
        print(f"Error checking auth: {e}")
        return JSONResponse(content={"message": "Error checking auth"}, status_code=500)


@router.get("/logout")
async def logout(response: Response):
    '''
    Docstring for logout
    '''
    try:
        # Clear the cookies
        supabase = await get_supabase_client("anon")
        sign_out_response = supabase.auth.sign_out()
        print(f"Sign out response from Supabase: {sign_out_response}")
        response.delete_cookie(key="access_token", path="/")
        response.delete_cookie(key="refresh_token", path="/")
        return JSONResponse(content={"message": "Logout successful"})
    except Exception as e:
        print(f"Error during logout: {e}")
        return JSONResponse(content={"message": "Logout failed"}, status_code=500)
    

@router.get("/test-auth")
async def test_auth():
    return {"message": "Test auth endpoint"}

@router.post("/sign-up/check")
async def sign_up(
    fname: str = Form(...),
    lname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    seeker_id: str = Form(...)
    ):
    '''
    Docstring for sign_up
    '''
    # Check if seeker ID exists in the database
    exists = await verify_seeker_credentials(seeker_id, email)
    print(f"Seeker ID exists: {exists}")

    if exists:
        # Create user in Supabase Auth
        supabase = await get_supabase_client("anon")
        response = supabase.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "first_name": fname,
                    "last_name": lname,
                    "seeker_id": seeker_id
                }
            }
        })

        if response.user:
            print(f"User {email} signed up successfully.")
            return RedirectResponse(url="/", status_code=303)
        else:
            print(f"Sign-up failed for {email}.")
            return HTMLResponse(content='''Sign-up failed''', status_code=400)
    else:
        print("Seeker ID verification failed during sign-up.")
        return HTMLResponse(content='''
                            <h1>Sign-up failed. Contact Your Guild for Seeker ID Connected in Your Email</h1>
                            \n<a href="/">Go Back to Home</a>
                            ''', status_code=400)