import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# 1. Get the absolute path of this file (api/app/config.py)
current_file_path = Path(__file__).resolve()

# 2. Go up until we hit the 'seeker-website' folder
# Let's use search logic to find the file exactly where it is
BASE_DIR = current_file_path.parent # starts at api/app/
while BASE_DIR.name != "seeker-website" and BASE_DIR.parent != BASE_DIR:
    BASE_DIR = BASE_DIR.parent

env_mode = os.getenv("env", "development")
env_file_name = ".env.development" if env_mode == "development" else ".env"
env_path = BASE_DIR / env_file_name

print(f"DEBUG: Calculated BASE_DIR: {BASE_DIR}")
print(f"DEBUG: Looking for {env_file_name} at: {env_path}")
print(f"DEBUG: Found it? {env_path.exists()}")

class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_KEY_ADMIN: str
    ALGORITHM: str = "HS256"
    BUCKET_SUPABASE: str
    EVENTS_TABLE: str
    ALLOWED_HOSTS: str = ""

    model_config = SettingsConfigDict(
        env_file=env_path,
        env_file_encoding='utf-8',
        extra='ignore'
    )

settings = Settings()
