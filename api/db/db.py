# app/db/db.py

# Config imports to access environment variables
from api.config import Settings

# Will use these to create Supabase client
import os
from supabase import create_client, Client

# FastAPI imports for dependency injection
from fastapi import Depends, HTTPException, Request

settings = Settings()

SUPABASE_URL: str = settings.SUPABASE_URL
SUPABASE_KEY: str = settings.SUPABASE_KEY
SUPABASE_KEY_ADMIN: str = settings.SUPABASE_KEY_ADMIN

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
supabase_admin: Client = create_client(SUPABASE_URL, SUPABASE_KEY_ADMIN)

if supabase is None:
    raise ValueError("Supabase client could not be created. Check your environment variables.")
else:
    print("Supabase client created successfully.")
if supabase_admin is None:
    raise ValueError("Supabase admin client could not be created. Check your environment variables.")
else:
    print("Supabase admin client created successfully.")

async def get_supabase_client(client_type: str = "anon") -> Client:
    """
    Dependency to get the appropriate Supabase client.
    :param client_type: 'user' for regular client, 'admin' for admin client
    :return: Supabase Client instance
    """
    if client_type == "admin":
        return supabase_admin
    return supabase