from groq import Groq
from dotenv import load_dotenv
import json
from typing import Dict
from models import NutritionalData
import os

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Template for nutritional data response including dish_name
NUTRITION_TEMPLATE = {
    "dish_name": "grilled_cheese_sandwich",
    "calories": 245.5,
    "protein": 12.3,
    "carbohydrates": 45.6,
    "fats": 8.2,
    "fiber": 3.5,
    "sugar": 2.1,
    "serving_size": "100g",
    "portion_weight": 100.0,
    "vitamins": {
        "vitamin_a": 85.5,
        "vitamin_c": 12.3,
        "vitamin_d": 2.1
    },
    "minerals": {
        "calcium": 120.5,
        "iron": 2.8,
        "potassium": 350.2
    }
}

async def fetch_nutritional_data(dish_name: str) -> Dict:
    """
    Fetch nutritional data for a dish using Groq.
    Returns structured nutritional information per serving including dish_name.
    """
    prompt = f"""
<INSTRUCTIONS>
You MUST:
1. Output EXCLUSIVELY a JSON object matching this EXACT structure:
{json.dumps(NUTRITION_TEMPLATE, indent=2)}
NOTE: Values should be replaced with accurate nutritional data for {dish_name}.

2. Use double quotes ONLY
3. Maintain all keys exactly as shown
4. Never include markdown or extra text
5. Follow these value rules:
   - dish_name must be a string formatted as lowercase with underscores (e.g., grilled_cheese_sandwich)
   - All numerical values must be positive floats
   - serving_size must be exactly "100g"
   - portion_weight must be included and is weight in grams
   - All vitamin and mineral values must be in milligrams (mg)
   - Calories must be per serving
   - If the dish is unknown, set all numerical values to 0 and serving_size to "0g"

<PROHIBITIONS>
- No text outside JSON object
- No missing keys
- No schema deviations
- No comments
- No trailing commas
- No approximate values or ranges

<DISH_NAME>
{dish_name}
</INSTRUCTIONS>
"""

    messages = [
        {
            "role": "system",
            "content": "You are a nutrition analyzer. Return ONLY perfect JSON matching the exact template."
        },
        {"role": "user", "content": prompt}
    ]

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.3,  # Lower temperature for more consistent output
            max_tokens=500,
            response_format={"type": "json_object"},
            stream=False
        )

        response_data = json.loads(completion.choices[0].message.content.strip())
        nutritional_data = NutritionalData(**{k: v for k, v in response_data.items() if k != "dish_name"})
        # Return a flat dict with dish_name merged into nutritional data to avoid nested nutritional_data
        return {**nutritional_data.dict(), "dish_name": response_data.get("dish_name", "")}
    except Exception as e:
        raise Exception(f"Failed to fetch nutritional data: {str(e)}")
