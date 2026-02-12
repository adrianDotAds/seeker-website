# Router for fetching events from the database
from urllib import response
from fastapi import APIRouter
import json

# Access to Supabase client if needed
from api.db import *

router = APIRouter()

@router.get("/api/getevents")
async def get_events():
    supabase = await get_supabase_client("admin") # type: ignore
    
    # 1. The bucket name must NOT contain slashes.
    bucket_name = "events" 
    
    # 2. The path MUST include the folder name.
    file_path = "/test1.png"

    try:
        simulated_json_response = {
            "events": {
                "event-1": {
                    "name": "event1.png",
                    "public_url": "https://jgbqbxtnfsvwigwkpyrs.supabase.co/storage/v1/object/public/events/event1.png"
                },
                "event-2": {
                    "name": "event2.png",
                    "public_url": "https://jgbqbxtnfsvwigwkpyrs.supabase.co/storage/v1/object/public/events/event2.png"
                }
            }
        }
        return simulated_json_response
        # Generate the public URL
        # response = supabase.storage.from_(bucket_name).get_public_url(
        #     file_path
        # )

        # Get event names and their corresponding public URLs then return as a dictionary
        event_items = {f'{i}': {
            'name': item['name'],
            'public_url': supabase.storage.from_(bucket_name).get_public_url(item['name'])
        } for i, item in enumerate(supabase.storage.from_(bucket_name).list(), 1)}
        print(f"Event items: {json.dumps(event_items, indent=2)}")  # Print the event items for debugging

        '''
        this is how to access the public URLs from the event_items dictionary:
        events = {
        "event-1": {
            "name": "event1.png",
            "public_url": "https://jgbqbxtnfsvwigwkpyrs.supabase.co/storage/v1/object/public/events/event1.png"
        },
        "event-2": {
            "name": "event2.png",
            "public_url": "https://jgbqbxtnfsvwigwkpyrs.supabase.co/storage/v1/object/public/events/event2.png"
        }
        }

        for item in events.values():
            url = item.get("public_url")
            print(url)
        '''

        return {"events": event_items}
        
    except Exception as e:
        print(f"Detailed Error: {e}")
        return {"error": str(e)}