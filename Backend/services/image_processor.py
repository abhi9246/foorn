from typing import Any
import os
from ultralytics import YOLO

# Construct absolute path to the model file
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "best.pt")

# Load the YOLOv8 model using ultralytics package
model = YOLO(MODEL_PATH)

CONFIDENCE_THRESHOLD = 0.5  # Set your threshold here

async def extract_dish_name(image_path: str) -> str:
    """
    Extract dish name from an image using the YOLO model.
    If no confident detection is found, return a rejection message.
    """
    results = model(image_path)
    result = results[0]

    if result.boxes is not None and len(result.boxes) > 0:
        confidences = result.boxes.conf.cpu().numpy()
        classes = result.boxes.cls.cpu().numpy()
        best_idx = confidences.argmax()
        best_conf = confidences[best_idx]

        if best_conf >= CONFIDENCE_THRESHOLD:
            class_index = int(classes[best_idx])
            class_name = model.names[class_index]
            return class_name
        else:
            return "Not a food item. Upload another image."
    else:
        return "Not a food item. Upload another image."
