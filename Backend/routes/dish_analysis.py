from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os
from services.image_processor import extract_dish_name
from services.groq_client import fetch_nutritional_data

router = APIRouter()

@router.post("/analyze")
async def analyze_dish(image: UploadFile = File(...)):
    try:
        # Save uploaded image to a temporary file
        temp_file_path = f"temp_{image.filename}"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Extract dish name using image processor service
        dish_name = await extract_dish_name(temp_file_path)

        # Query Groq for nutritional data
        nutritional_data = await fetch_nutritional_data(dish_name)

        # Remove temporary file
        os.remove(temp_file_path)

        return JSONResponse(content={"dish_name": dish_name, "nutritional_data": nutritional_data})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
