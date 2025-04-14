from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import pandas as pd
from database import history_collection
from datetime import datetime
import tempfile
import os

router = APIRouter()

@router.get("/{user_email}/export-csv")
async def export_history_to_csv(
    user_email: str,
    start_date: datetime,
    end_date: datetime
):
    try:
        cursor = history_collection.find({
            "user_email": user_email,
            "timestamp": {"$gte": start_date, "$lte": end_date}
        })
        
        data = []
        async for entry in cursor:
            nutrition = entry['dish_analysis']['nutritional_data']
            data.append({
                "Date": entry['timestamp'],
                "Dish": entry['dish_analysis']['dish_name'],
                "Calories": nutrition['calories'],
                "Protein": nutrition['protein'],
                "Carbs": nutrition['carbohydrates'],
                "Fats": nutrition['fats'],
                "Meal Type": nutrition.get('meal_type', 'Not specified')
            })
        
        if not data:
            raise HTTPException(status_code=404, detail="No data found")
            
        df = pd.DataFrame(data)
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.csv') as tmp:
            df.to_csv(tmp.name, index=False)
            return FileResponse(
                tmp.name,
                media_type='text/csv',
                filename=f'nutrition_history_{start_date.date()}_{end_date.date()}.csv'
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))