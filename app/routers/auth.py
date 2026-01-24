# app/routers/auth.py

# imports for FastAPI router
from fastapi import APIRouter

# imports for form data handling
from fastapi import Form
from fastapi.templating import Jinja2Templates

# Access to Supabase client if needed
from app.db import *

# HTML response and redirection
from fastapi.responses import HTMLResponse, RedirectResponse

template = Jinja2Templates(directory="app/templates")

router = APIRouter()

@router.post("/login")
async def login(
    email: str = Form(...),
    password: str = Form(...),
    seeker_id: str = Form(...)
):
    '''
    Docstring for login
    
    :param email: Email recorded by admin
    :type email: str
    :param password: Password created by user
    :type password: str
    :param seeker_id: Seeker ID provided by admin
    :type seeker_id: str
    '''

    # Check if Credentials are valid
    is_valid = await verify_seeker_credentials(seeker_id, email)
    print(f"Credentials valid: {is_valid}")
    if is_valid:
        # Login the user
        supabase = await get_supabase_client("anon")
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        # Get cookie with access token
        if response.session:
            # Get user for jinja rendering
            user = response.user.user_metadata.get("first_name", "User")
            print(f"User {user} logged in successfully")
            # Create redirect response to dashboard with user info
            redirect_url = RedirectResponse(url=f"/dashboard?user_name={user}", status_code=303)
            # Set cookie with access token
            redirect_url.set_cookie(
                key="access_token", 
                value=response.session.access_token,
                httponly=True,
                )

            # print(redirect_url.value)
            print("Login successful, redirecting to dashboard")
            return redirect_url
        else:
            print("Login failed, no session returned")
            return HTMLResponse(content='''Login failed''', status_code=400)
    else:
        print("Invalid credentials provided")
        return HTMLResponse(content='''
                            <h1>Login failed</h1>
                            <a href="/">Go Back to Home</a>
                            ''', status_code=400)
            
        # Perform login and return response
        # await login_user()
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