import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timedelta
from bson import ObjectId

def test_get_user_history(test_app, mock_history_data):
    # Test getting history for a specific user
    response = test_app.get(f"/history/{mock_history_data['user_email']}")
    assert response.status_code == 200
    data = response.json()
    
    # Check response structure
    assert "summary" in data
    assert "daily_records" in data
    
    # Check summary fields
    assert "total_entries" in data["summary"]
    assert "date_range" in data["summary"]
    
    # Check daily records structure if any exist
    if data["daily_records"]:
        first_record = data["daily_records"][0]
        assert "date" in first_record
        assert "totals" in first_record
        assert "meals" in first_record

def test_get_history_with_filters(test_app, mock_history_data):
    # Test history with different query parameters
    params = {
        "days": 7,
        "meal_type": "lunch",
        "sort_by": "calories",
        "order": "desc"
    }
    response = test_app.get(
        f"/history/{mock_history_data['user_email']}",
        params=params
    )
    assert response.status_code == 200

def test_nutrition_trends(test_app, mock_history_data):
    # Test getting nutrition trends
    response = test_app.get(
        f"/history/{mock_history_data['user_email']}/nutrition-trends",
        params={"days": 30}
    )
    assert response.status_code == 200
    data = response.json()
    
    # Check if the response contains daily totals
    assert isinstance(data, dict)
    if data:  # If there's data
        first_date = list(data.keys())[0]
        assert "calories" in data[first_date]
        assert "protein" in data[first_date]
        assert "carbs" in data[first_date]
        assert "fats" in data[first_date]

def test_date_range_history(test_app, mock_history_data):
    # Test getting history within a date range
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=7)
    
    response = test_app.get(
        f"/history/{mock_history_data['user_email']}/range",
        params={
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat()
        }
    )
    assert response.status_code == 200

def test_delete_history_entry(test_app):
    # Test deleting a history entry
    fake_id = str(ObjectId())
    response = test_app.delete(f"/history/{fake_id}")
    # Should return 404 as the entry doesn't exist
    assert response.status_code == 404