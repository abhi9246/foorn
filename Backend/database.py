from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get MongoDB credentials from environment variables
MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER")
DB_NAME = os.getenv("MONGO_DATABASE", "foorn_db")

# Construct MongoDB URI using environment variables
MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority"

# Initialize MongoDB client
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Collections for food nutrition analysis
users_collection = db["users"]  # Store user authentication data
dishes_collection = db["dishes"]  # Store analyzed dish data
history_collection = db["history"]  # Store user's dish analysis history
reports_collection = db["reports"]  # Store generated reports
feedback_collection = db["feedback"]  # Store user feedback