# db.py

# Will use these to create Supabase client
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# FastAPI imports for dependency injection
from fastapi import Depends, HTTPException, Request

# Logging
import logging

load_dotenv()

# Logging configuration
logger = logging.getLogger(__name__)

SUPABASE_URL: str = os.getenv("SUPABASE_URL")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
SUPABASE_KEY_ADMIN: str = os.getenv("SUPABASE_KEY_ADMIN")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
supabase_admin: Client = create_client(SUPABASE_URL, SUPABASE_KEY_ADMIN)

if supabase is None:
    raise ValueError("Supabase client could not be created. Check your environment variables.")
else:
    logging.info("Supabase client created successfully.")
if supabase_admin is None:
    raise ValueError("Supabase admin client could not be created. Check your environment variables.")
else:
    logging.info("Supabase admin client created successfully.")