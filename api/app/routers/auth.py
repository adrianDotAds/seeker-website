# app/routers/auth.py

# imports for FastAPI router
from fastapi import APIRouter

# imports for form data handling
from fastapi import Form
from fastapi.templating import Jinja2Templates

# Access to Supabase client if needed
from app.db import *

# HTML response and redirection
from fastapi.responses import JSONResponse, Response

template = Jinja2Templates(directory="app/templates")

router = APIRouter()

@router.post("/login")
async def login(payload: dict, response: Response):
    '''
    Docstring for login
    
    :param email: Email recorded by admin
    :type email: str
    :param password: Password created by user
    :type password: str
    :param seeker_id: Seeker ID provided by admin
    :type seeker_id: str
    '''
    print("Login payload received:", payload)
    email = payload.get("email")
    password = payload.get("password")
    seeker_id = payload.get("seeker_id")
    print(f"Login attempt for email: {email} with seeker ID: {seeker_id}")
    
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

            # Create message response
            content = {
                "message": "Login successful",
                "user": response.user.user_metadata.get("first_name", "User"),
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                    "expires_at": response.session.expires_in
                }
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
                secure=True,
                samesite="lax",
                max_age=30 # 1 hour
            )
            response_obj.set_cookie(
                key="refresh_token", 
                value=response.session.refresh_token,
                httponly=True,
                secure=True,
                samesite="lax",
                max_age=30
            )
            return response_obj
            # Perform login and return response
            # await login_user()
        except Exception as e:
            print(f"Error during login: {e}")
            return JSONResponse(content={"message": "Login failed"}, status_code=400)
    else:
        return JSONResponse(content={"message": "Invalid credentials"}, status_code=401)
    # print("Invalid credentials, redirecting to home")
    # return RedirectResponse(url="/", status_code=303)

@router.get("/logout")
async def logout():
    # Create redirect response to home
    redirect_url = RedirectResponse(url="/", status_code=303)
    # Remove the access token cookie
    redirect_url.delete_cookie(key="access_token")
    print("User logged out, redirecting to home")
    return redirect_url

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