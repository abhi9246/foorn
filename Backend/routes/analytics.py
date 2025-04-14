from fastapi import APIRouter, HTTPException
from database import history_collection
from datetime import datetime, timedelta
from typing import Dict

router = APIRouter()

@router.get("/trends")
async def get_nutrition_trends(user_email: str, days: int = 30):
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        cursor = history_collection.find({
            "user_email": user_email,
            "timestamp": {"$gte": start_date, "$lte": end_date}
        })
        
        daily_totals: Dict[str, Dict[str, float]] = {}
        async for entry in cursor:
            date = entry['timestamp'].date().isoformat()
            if date not in daily_totals:
                daily_totals[date] = {
                    "calories": 0,
                    "protein": 0,
                    "carbs": 0,
                    "fats": 0
                }
            
            nutrition = entry['dish_analysis']['nutritional_data']
            daily_totals[date]["calories"] += nutrition["calories"]
            daily_totals[date]["protein"] += nutrition["protein"]
            daily_totals[date]["carbs"] += nutrition["carbohydrates"]
            daily_totals[date]["fats"] += nutrition["fats"]
        
        return daily_totals
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))