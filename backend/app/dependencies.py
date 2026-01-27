# app/dependencies.py
from fastapi import Request, HTTPException

# database access
from app.db.db import get_supabase_client

async def get_current_user(request: Request):
    """
    Dependency to get the current authenticated user from the request.
    This is a placeholder function and should be implemented to extract user info from the request.
    """
    # Navigate to get the Supabase client
    supabase = await get_supabase_client("admin")

    # 1. Get the token from request headers
    token = request.cookies.get("access_token")
    print(f"Access token from cookies: {token}")

    if not token:
        print("No access token found in request")
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # 2. Check token validity with Supabase
    try:
        print("Validating token with Supabase")
        response = supabase.auth.get_user(token)
        print(f"Supabase response: {response}")
        print(f"Authenticated user: {response.user}")
        user = response.user.user_metadata.get("first_name", "User")
        print(f"User name from metadata: {user}")
        # return user info if valid
        return user
    except Exception as e:
        print(f"Error validating token: {e}")
        raise HTTPException(status_code=401, detail="Invalid token, Retry Login") from e