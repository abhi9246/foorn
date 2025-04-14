from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Literal
from datetime import datetime

class User(BaseModel):
    email: str
    password: str
    name: Optional[str]
    preferences: Optional[Dict[str, str]] = Field(default_factory=dict)
    daily_calorie_goal: Optional[float] = None

class UserSignup(BaseModel):
    email: str
    password: str
    name: Optional[str]
    daily_calorie_goal: Optional[float] = None

class UserLogin(BaseModel):
    email: str
    password: str

class NutritionalData(BaseModel):
    calories: float
    protein: float  # in grams
    carbohydrates: float  # in grams
    fats: float  # in grams
    fiber: float  # in grams
    sugar: float  # in grams
    serving_size: str
    portion_weight: Optional[float] = Field(description="Weight in grams")
    vitamins: Optional[Dict[str, float]]
    minerals: Optional[Dict[str, float]]
    allergens: Optional[List[str]] = Field(default_factory=list)
    ingredients: Optional[List[str]] = Field(default_factory=list)
    meal_type: Optional[Literal["breakfast", "lunch", "dinner", "snack"]] = None

class DishAnalysis(BaseModel):
    user_email: str
    dish_name: str
    nutritional_data: NutritionalData
    image_url: Optional[str]
    date_analyzed: datetime
    confidence_score: Optional[float] = Field(ge=0, le=1)
    tags: Optional[List[str]] = Field(default_factory=list)
    cuisine_type: Optional[str] = None
    is_favorite: Optional[bool] = False

class HistoryEntry(BaseModel):
    user_email: str
    dish_analysis: DishAnalysis
    timestamp: datetime
    notes: Optional[str]
    mood_after: Optional[Literal["good", "neutral", "bad"]] = None
    energy_level: Optional[int] = Field(ge=1, le=5)

class MonthlyReport(BaseModel):
    user_email: str
    month: int
    year: int
    total_calories: float
    dishes_analyzed: List[DishAnalysis]
    start_date: datetime
    end_date: datetime
    daily_averages: Dict[str, float] = Field(description="Average nutrients per day")
    goals_met: Optional[Dict[str, bool]] = Field(default_factory=dict)
    most_frequent_dishes: List[str] = Field(default_factory=list)
    nutritional_trends: Optional[Dict[str, List[float]]] = Field(default_factory=dict)

class FeedbackRequest(BaseModel):
    name: str
    email: str
    message: str
    rating: Optional[int] = Field(ge=1, le=5)
    category: Optional[Literal["bug", "feature", "suggestion", "other"]] = "other"
    app_version: Optional[str] = None

class DailyNutritionGoals(BaseModel):
    user_email: str
    calories: float = Field(gt=0)
    protein: float = Field(gt=0)
    carbohydrates: float = Field(gt=0)
    fats: float = Field(gt=0)
    fiber: Optional[float] = Field(gt=0)
