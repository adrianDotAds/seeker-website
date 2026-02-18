from .db import get_supabase_client
from api.config import Settings

# Check for email and seeker ID are matching in the members table
async def verify_seeker_credentials(seeker_id: str, email: str) -> bool:
    supabase = await get_supabase_client("admin")
    response = supabase.table("members").select("*").eq("email", email).eq("seeker_id", seeker_id).execute()
    
    # Return True if email matches, else False
    try:
        if response.data is not None and len(response.data) > 0:
            print("Seeker credentials verified successfully.")
            return True
    except Exception as e:
        print("Seeker credentials verification failed.")
        return False
    
async def upload_event_image(file: bytes, event_name: str):
    supabase = await get_supabase_client("admin")
    bucket_name = Settings().BUCKET_SUPABASE
    print(f"Bucket name from settings: {bucket_name}")
    
    # FIX: Create a unique path for the file inside the bucket
    # Example: "concert_event_1715234.jpg"
    import time
    timestamp = int(time.time())
    file_path = f"{event_name}_{timestamp}"
    
    # print(f"Uploading to bucket '{bucket_name}' as file: {file_path}")
    
    try:
        # 1. Upload the bytes
        # Note: If your client is synchronous, remove 'await' if it causes errors
        # print(f"File: {file}, Path: {file_path}, Bucket: {bucket_name}")
        supabase.storage.from_(bucket_name).upload(
            file=file,
            path=file_path,
            file_options={
                "content-type": "image/png",  # Adjust content type as needed
                "upsert": "false"
            }
        )
        
        # 2. Get Public URL
        print(f"File uploaded successfully. Now retrieving public URL for: {file_path}")
        response = supabase.storage.from_(bucket_name).get_public_url(file_path)
        
        # get_public_url usually returns a string or an object with a public_url attr
        return response if isinstance(response, str) else response.get("publicURL")

    except Exception as e:
        print(f"Error uploading event image: {e}")
        return None