from fastapi import APIRouter, HTTPException
from database import users_collection
from models import DailyNutritionGoals
from typing import List

router = APIRouter()

@router.post("/{user_email}/goals")
async def set_nutrition_goals(user_email: str, goals: DailyNutritionGoals):
    try:
        await users_collection.update_one(
            {"email": user_email},
            {"$set": {"nutrition_goals": goals.dict()}}
        )
        return {"status": "success", "message": "Nutrition goals updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{user_email}/allergies")
async def update_allergies(user_email: str, allergies: List[str]):
    try:
        await users_collection.update_one(
            {"email": user_email},
            {"$set": {"dietary_restrictions": allergies}}
        )
        return {"status": "success", "message": "Allergies updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))