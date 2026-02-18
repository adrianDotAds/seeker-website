# app/config.py
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()  # Load environment variables from .env file

class Settings(BaseModel):
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
    SUPABASE_KEY_ADMIN: str = os.getenv("SUPABASE_KEY_ADMIN")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET")
    ALGORITHM: str = "HS256"

class IPWhitelist(BaseModel):
    allowed_ips: list[str] = os.getenv("ALLOWED_IPS", "").split(",")  # Comma-separated list of allowed IPs
