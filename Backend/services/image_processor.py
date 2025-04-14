from typing import Any
import os
from ultralytics import YOLO

# Construct absolute path to the model file
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "best.pt")

# Load the YOLOv8 model using ultralytics package
model = YOLO(MODEL_PATH)

async def extract_dish_name(image_path: str) -> str:
    """
    Extract dish name from an image using the YOLO model.
    """
    results = model(image_path)
    # Assuming the model returns a list of results, take the first
    result = results[0]

    # Get detected class names
    if result.boxes is not None and len(result.boxes) > 0:
        # Get the class index of the detection with the highest confidence
        confidences = result.boxes.conf.cpu().numpy()
        classes = result.boxes.cls.cpu().numpy()
        best_idx = confidences.argmax()
        class_index = int(classes[best_idx])
        class_name = model.names[class_index]
        return class_name
    else:
        return "Unknown Dish"
