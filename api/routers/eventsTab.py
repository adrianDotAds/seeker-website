# Router for fetching events from the database
from urllib import response
from fastapi import APIRouter, Request
import json

# Access to Supabase client if needed
from api.db import *

# Access to token validation dependency
from api.dependencies import validate_token

# Access to configuration settings
from api.config import Settings

# Other Python libraries
from datetime import datetime

router = APIRouter()

@router.get("/api/getevents")
async def get_events():
    supabase = await get_supabase_client("admin") # type: ignore
    
    # 1. GET all events from the database
    try:
        response = supabase.table(Settings().EVENTS_TABLE).select("*").execute()
        print(f"Raw response from Supabase: {response}")

        for event in response.data:
            print(f"Event: {event}")
    

        return {"events": response.data}
        
    except Exception as e:
        print(f"Detailed Error: {e}")
        return {"error": str(e)}
    
@router.post("/api/add-events")
async def add_events(request: Request):
    # Get date
    date_created = datetime.now().isoformat()
    print(f"Current date and time: {date_created}")
    # Parse form data from the request
    form_data = await request.form()
    # Get user using token validation dependency
    user = await validate_token(request.cookies.get("access_token"), request.cookies.get("refresh_token"))
    print(f"Authenticated user: {user}")
    # Convert form data to a dictionary for easier access
    form_data_dict = {key: value for key, value in form_data.items()}
    print(f"Received form data: {form_data_dict}")
    '''
    {
    "title": "test",
    "description": "testing",
    "image": {
        "filename": "Test.svg.png",
        "size": 144217,
        "content_type": "image/png",
        "headers": {
        "content-disposition": "form-data; name=\"image\"; filename=\"Test.svg.png\"",
        "content-type": "image/png"
            }
        }
    }
    '''
    # Upload the image to Supabase storage and get the public URL
    image_file = form_data_dict.get("image")
    if image_file is not None:
        image_content = await image_file.read()  # Read the file content as bytes
        print(f"Image file content read successfully: {len(image_content)} bytes")
        event_name = form_data_dict.get("title", "default_event_name")
        print(f"Event name for image upload: {event_name}")
        public_url = await upload_event_image(image_content, event_name)
        print(f"Image uploaded successfully. Public URL: {public_url}")
        print(f"Public URL of the uploaded image: {public_url}")
    else:
        print("No image file provided in the form data.")

    # Save the event details (title, description, public_url) to the database here
    supabase = await get_supabase_client("admin") # type: ignore
    event_details = {
        "title": form_data_dict.get("title", "default_title"),
        "description": form_data_dict.get("description", "default_description"),
        "imageURL": public_url if public_url else None,
        "added_by": user,
        "date": date_created
    }
    try:
        response = supabase.table(Settings().EVENTS_TABLE).insert(event_details).execute()
        print(f"Event details saved to database: {response}")
    except Exception as e:
        print(f"Error saving event details to database: {e}")

    # Here you would typically save the event details (title, description, public_url) to your database
    return {"message": "Event added successfully."}

@router.get("/api/test-events")
async def test_events():
    return {"message": "This is a test endpoint for events."}