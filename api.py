import os
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mongoconnect.mongoconnect import MongoConnector
from data_models import Patient_data, start_of_cycle_info, end_of_cycle_info, need_only_data, graph_data, heart_data, respiratory_data, blood_gasses, expelled_fluids

# Define the MongoDB URL and the database name
mongo_url = "mongodb://mongo:SweRLiuIURHWkPCpwwwggQLJemBvIneM@roundhouse.proxy.rlwy.net:41370"
database_name = "icudb"  # Specify your database name here

mongo = MongoConnector(mongo_url, database_name)
app = FastAPI()

# CORS configuration
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

# Root endpoint
@app.get("/")
async def root():
    return {"status": "ok"}

# Patient data endpoints
@app.get("/patient_data/{pid}")
async def get_patient_info(pid: int):
    data = mongo.get_patient_data(pid)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

@app.post("/patient_data/")
async def post_patient_info(item: Patient_data):
    mongo.post_patient_data(item)
    return item

# Graph data endpoints
@app.get("/graph_data/{pid}")
async def get_graph_data(pid: int, start_time = Query(None), end_time = Query(None)):
    data = mongo.get_graph_data(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

@app.post("/graph_data")
async def post_graph_data(item: graph_data):
    mongo.post_graph_data(item)
    return item

# Implement similar endpoints for start_of_cycle_info, end_of_cycle_info, heart_data, respiratory_data, blood_gasses, expelled_fluids
