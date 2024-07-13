from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mongoconnect.mongoconnect import MongoConnector
from data_models import Patient_data, start_of_cycle_info, end_of_cycle_info, need_only_data, graph_data, heart_data, respiratory_data, blood_gasses, expelled_fluids

mongo = MongoConnector("icudb", "localhost", 27017)
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

# root node
@app.get("/")
async def root():
    return {"status": "ok"}

# get patient data
@app.get("/patient_data/{pid}")
async def get_patient_info(pid: int):
    data = mongo.get_patient_data(pid)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post patient data
@app.post("/patient_data/")
async def post_patient_info(item: Patient_data):
    mongo.post_patient_data(item)
    return item

# get patient graph data
@app.get("/graph_data/{pid}")
async def get_graph_data(pid: int, start_time = Query(None), end_time = Query(None)):
    data = mongo.get_graph_data(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post patient graph data
@app.post("/graph_data")
async def post_graph_data(item: graph_data):
    mongo.post_graph_data(item)
    return item

# get start of cycle patient info
@app.get("/start_of_cycle_info/{pid}")
async def get_start_of_cycle_info(pid: int, start_time = Query(None), end_time = Query(None)):
    data =  mongo.get_start_of_cycle_info(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post start of cycle patient info
@app.post("/start_of_cycle_info")
async def post_start_of_cycle_info(item: start_of_cycle_info):
    return mongo.post_start_of_cycle_info(item)

# get end of cycle patient info
@app.get("/end_of_cycle_info/{pid}")
async def get_end_of_cycle_info(pid: int, start_time = Query(None), end_time = Query(None)):
    data = mongo.get_end_of_cycle_info(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post end of cycle patient info
@app.post("/end_of_cycle_info")
async def post_end_of_cycle_info(item: end_of_cycle_info):
    return mongo.post_end_of_cycle_info(item)

# get patient heart data
@app.get("/heart_data/{pid}")
async def get_heart_data(pid: int, start_time = Query(None), end_time = Query(None)):
    data =  mongo.get_heart_data(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post patient heart data
@app.post("/heart_data")
async def post_heart_data(item: heart_data):
    return mongo.post_heart_data(item)

# get patient respiratory data
@app.get("/respiratory_data/{pid}")
async def get_respiratory_data(pid: int, start_time = Query(None), end_time = Query(None)):
    data = mongo.get_respiratory_data(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post patient respiratory data
@app.post("/respiratory_data")
async def post_respiratory_data(item: respiratory_data):
    return mongo.post_respiratory_data(item)

# get patient plood gasses
@app.get("/blood_gasses/{pid}")
async def get_blood_gasses(pid: int, start_time = Query(None), end_time = Query(None)):
    data = mongo.get_blood_gasses(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post patient blood gasses
@app.post("/blood_gasses")
async def post_blood_gasses(item: blood_gasses):
    return mongo.post_blood_gasses(item)

# get patient expelled fluids
@app.get("/expelled_fluids/{pid}")
async def get_expelled_fluids(pid: int, start_time = Query(None), end_time = Query(None)):
    data = mongo.get_expelled_fluids(pid, start_time, end_time)
    if not data:
        raise HTTPException(status_code=404, detail=f"patient id:{pid} not found")
    return data

# post patient expelled fluids
@app.post("/expelled_fluids")
async def post_expelled_fluids(item: expelled_fluids):
    return mongo.post_expelled_fluids(item)
