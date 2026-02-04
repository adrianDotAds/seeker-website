from .db import get_supabase_client

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