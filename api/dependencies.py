# api/dependencies.py
from fastapi import Request, HTTPException, Response, Cookie

# database access
from api.db.db import get_supabase_client

async def validate_token(
        access_token: str | None = Cookie(None), 
        refresh_token: str | None = Cookie(None), 
        response: Response = Response()
        ):
    """
    Dependency to get the current authenticated user from the request.
    This is a placeholder function and should be implemented to extract user info from the request.
    """
    return {"first_name": "Demo User"}
    # 1. Get Supabase client
    supabase = await get_supabase_client("admin")

    # 2. Verify first the access token
    token = supabase.auth.get_user(access_token)
    print(f'Initial token verification result: {token}')
    if token is not None:
        print("Access token is valid")
        # 2.1 Return user info if valid
        return token.user.user_metadata.get("first_name")
    else:
        print("Access token is invalid or not provided")
        # 2.2 If access token is invalid, try to refresh using refresh token
        print("Attempting to refresh access token using refresh token")
        try:
            # 2.2.1 Refresh the token
            auth_response = supabase.auth.refresh_session(refresh_token)
            # 2.2.2 Extract new tokens
            new_access_token = auth_response.session.access_token
            print(f"\nNew access token obtained: {new_access_token}\n")
            new_refresh_token = auth_response.session.refresh_token
            print(f"\nNew refresh token obtained: {new_refresh_token}\n")
            # 2.2.3 Ideally, set the new tokens in the response cookies here
            response.set_cookie(
                key="access_token",
                value=new_access_token,
                httponly=True,
                secure=False,
                samesite="lax",
                path="/",
                max_age=30
            )
            response.set_cookie(
                key="refresh_token",
                value=new_refresh_token,
                httponly=True,
                secure=False,
                samesite="lax",
                path="/",
                max_age=30
            )
            # Return the user info
            return auth_response.user.user_metadata.get("first_name")
        except Exception as e:
            print(f"Error refreshing token: {e}")
            raise HTTPException(status_code=401, detail="Invalid tokens, Retry Login") from e