from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.dish_analysis import router as dish_router

from dotenv import load_dotenv
import os
app = FastAPI()

# Load environment variables from .env file
load_dotenv()
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("REACT_APP_API_URL"),  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router, prefix="/auth")
app.include_router(dish_router, prefix="/dish")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=os.getenv("PORT"), reload=True)