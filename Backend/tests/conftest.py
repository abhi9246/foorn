import pytest
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import asyncio
from main import app
from database import history_collection

@pytest.fixture
def test_app():
    return TestClient(app)

@pytest.fixture
def mock_history_data():
    return {
        "user_email": "test@example.com",
        "dish_analysis": {
            "dish_name": "Test Dish",
            "nutritional_data": {
                "calories": 500.0,
                "protein": 25.0,
                "carbohydrates": 45.0,
                "fats": 20.0,
                "meal_type": "lunch"
            },
            "image_url": "http://example.com/image.jpg",
            "is_favorite": True
        },
        "timestamp": datetime.utcnow(),
        "notes": "Test notes"
    }