import os
import logging
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from mongoconnect.mongoconnect import MongoConnector
from data_models import (
    Patient_data, start_of_cycle_info, end_of_cycle_info, need_only_data, graph_data, 
    heart_data, respiratory_data, blood_gasses, expelled_fluids
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Retrieve environment variables
mongo_user = os.getenv("MONGO_USER")
mongo_password = os.getenv("MONGO_PASSWORD")
mongo_host = os.getenv("MONGO_HOST")
mongo_port = os.getenv("MONGO_PORT")
mongo_url = os.getenv("MONGO_URL")

# Log environment variables (be careful with sensitive information)
logger.info(f"MONGO_USER: {mongo_user}")
logger.info(f"MONGO_HOST: {mongo_host}")
logger.info(f"MONGO_PORT: {mongo_port}")
logger.info(f"MONGO_URL: {mongo_url}")

# If MONGO_URL is not provided, construct it
if not mongo_url:
    mongo_url = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}/"
    logger.info(f"Constructed MONGO_URL: {mongo_url}")

try:
    client = MongoClient(mongo_url)
    db = client.icudb
    logger.info("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise

mongo = MongoConnector("icudb", mongo_url)
app = FastAPI()

# Allow CORS
origins = [
    "http://localhost:3000",  # React app
    # Add other origins if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root node
@app.get("/")
async def root():
    return {"status": "ok"}

# Get patient data
@app.get("/patient_data/{pid}")
async def get_patient_info(pid: int):
    logger.info(f"Fetching patient data for ID: {pid}")
    try:
        data = mongo.get_patient_data(pid)
        if not data:
            logger.warning(f"Patient ID {pid} not found")
            raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
        logger.info(f"Successfully retrieved patient data for ID: {pid}")
        return data
    except Exception as e:
        logger.error(f"Failed to fetch patient data for ID {pid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Post patient data
@app.post("/patient_data/")
async def post_patient_info(item: Patient_data):
    logger.info(f"Posting patient data: {item}")
    try:
        mongo.post_patient_data(item)
        logger.info("Patient data posted successfully")
        return item
    except Exception as e:
        logger.error(f"Failed to post patient data: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Similar updates for other endpoints...

