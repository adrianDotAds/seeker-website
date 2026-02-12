# Router for fetching events from the database
from urllib import response
from fastapi import APIRouter

# Access to Supabase client if needed
from api.db import *

router = APIRouter()

@router.get("/api/getevents")
async def get_events():
    supabase = await get_supabase_client("anon") 
    
    # 1. The bucket name must NOT contain slashes.
    bucket_name = "testpublicbucket" 
    
    # 2. The path MUST include the folder name.
    file_path = "/test1.png" 

    try:
        # Generate the signed URL
        response = supabase.storage.from_(bucket_name).create_signed_url(
            path=file_path, 
            expires_in=3600
        )
        
        # supabase-py usually returns a dict like {'signedURL': '...'} 
        # or the URL string directly depending on the version.
        return {"url": response}
        
    except Exception as e:
        print(f"Detailed Error: {e}")
        return {"error": str(e)}