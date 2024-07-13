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

mongo = MongoConnector("icudb", mongo_host, mongo_port)
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
    data = mongo.get_patient_data(pid)
    if not data:
        logger.warning(f"Patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved patient data for ID: {pid}")
    return data

# Post patient data
@app.post("/patient_data/")
async def post_patient_info(item: Patient_data):
    logger.info(f"Posting patient data: {item}")
    mongo.post_patient_data(item)
    return item

# Get patient graph data
@app.get("/graph_data/{pid}")
async def get_graph_data(pid: int, start_time=Query(None), end_time=Query(None)):
    logger.info(f"Fetching graph data for ID: {pid} from {start_time} to {end_time}")
    data = mongo.get_graph_data(pid, start_time, end_time)
    if not data:
        logger.warning(f"Graph data for patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved graph data for ID: {pid}")
    return data

# Post patient graph data
@app.post("/graph_data")
async def post_graph_data(item: graph_data):
    logger.info(f"Posting graph data: {item}")
    mongo.post_graph_data(item)
    return item

# Get start of cycle patient info
@app.get("/start_of_cycle_info/{pid}")
async def get_start_of_cycle_info(pid: int, start_time=Query(None), end_time=Query(None)):
    logger.info(f"Fetching start of cycle info for ID: {pid} from {start_time} to {end_time}")
    data = mongo.get_start_of_cycle_info(pid, start_time, end_time)
    if not data:
        logger.warning(f"Start of cycle info for patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved start of cycle info for ID: {pid}")
    return data

# Post start of cycle patient info
@app.post("/start_of_cycle_info")
async def post_start_of_cycle_info(item: start_of_cycle_info):
    logger.info(f"Posting start of cycle info: {item}")
    return mongo.post_start_of_cycle_info(item)

# Get end of cycle patient info
@app.get("/end_of_cycle_info/{pid}")
async def get_end_of_cycle_info(pid: int, start_time=Query(None), end_time=Query(None)):
    logger.info(f"Fetching end of cycle info for ID: {pid} from {start_time} to {end_time}")
    data = mongo.get_end_of_cycle_info(pid, start_time, end_time)
    if not data:
        logger.warning(f"End of cycle info for patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved end of cycle info for ID: {pid}")
    return data

# Post end of cycle patient info
@app.post("/end_of_cycle_info")
async def post_end_of_cycle_info(item: end_of_cycle_info):
    logger.info(f"Posting end of cycle info: {item}")
    return mongo.post_end_of_cycle_info(item)

# Get patient heart data
@app.get("/heart_data/{pid}")
async def get_heart_data(pid: int, start_time=Query(None), end_time=Query(None)):
    logger.info(f"Fetching heart data for ID: {pid} from {start_time} to {end_time}")
    data = mongo.get_heart_data(pid, start_time, end_time)
    if not data:
        logger.warning(f"Heart data for patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved heart data for ID: {pid}")
    return data

# Post patient heart data
@app.post("/heart_data")
async def post_heart_data(item: heart_data):
    logger.info(f"Posting heart data: {item}")
    return mongo.post_heart_data(item)

# Get patient respiratory data
@app.get("/respiratory_data/{pid}")
async def get_respiratory_data(pid: int, start_time=Query(None), end_time=Query(None)):
    logger.info(f"Fetching respiratory data for ID: {pid} from {start_time} to {end_time}")
    data = mongo.get_respiratory_data(pid, start_time, end_time)
    if not data:
        logger.warning(f"Respiratory data for patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved respiratory data for ID: {pid}")
    return data

# Post patient respiratory data
@app.post("/respiratory_data")
async def post_respiratory_data(item: respiratory_data):
    logger.info(f"Posting respiratory data: {item}")
    return mongo.post_respiratory_data(item)

# Get patient blood gasses
@app.get("/blood_gasses/{pid}")
async def get_blood_gasses(pid: int, start_time=Query(None), end_time=Query(None)):
    logger.info(f"Fetching blood gasses for ID: {pid} from {start_time} to {end_time}")
    data = mongo.get_blood_gasses(pid, start_time, end_time)
    if not data:
        logger.warning(f"Blood gasses for patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved blood gasses for ID: {pid}")
    return data

# Post patient blood gasses
@app.post("/blood_gasses")
async def post_blood_gasses(item: blood_gasses):
    logger.info(f"Posting blood gasses: {item}")
    return mongo.post_blood_gasses(item)

# Get patient expelled fluids
@app.get("/expelled_fluids/{pid}")
async def get_expelled_fluids(pid: int, start_time=Query(None), end_time=Query(None)):
    logger.info(f"Fetching expelled fluids for ID: {pid} from {start_time} to {end_time}")
    data = mongo.get_expelled_fluids(pid, start_time, end_time)
    if not data:
        logger.warning(f"Expelled fluids for patient ID {pid} not found")
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    logger.info(f"Successfully retrieved expelled fluids for ID: {pid}")
    return data

# Post patient expelled fluids
@app.post("/expelled_fluids")
async def post_expelled_fluids(item: expelled_fluids):
    logger.info(f"Posting expelled fluids: {item}")
    return mongo.post_expelled_fluids(item)
