from fastapi import FastAPI, Query
from mongoconnect.mongoconnect import MongoConnector
from data_models import Patient_data, start_of_cycle_info, end_of_cycle_info, need_only_data, graph_data


mongo = MongoConnector("icudb", "localhost", 27017)
app = FastAPI()

#root node
@app.get("/")
async def root():
    return {"status": "ok"}

#get patient data
@app.get("/patient_data/{pid}")
async def get_patient_info(pid: int):
    return mongo.get_patient_data(pid)

#post patient data
@app.post("/patient_data/")
async def post_patient_info(item: Patient_data):
    mongo.post_patient_data(item)
    return item

#get patient hourly vitals
@app.get("/graph_data/{pid}")
async def get_graph_data(pid: int, start_time= Query(None), end_time = Query(None)):
    date_format = "%Y-%m-%d %H:%M:%S"
    # if start_time:
    #     date = datetime
    #     start_time = start_time.strftime(date_format)
    # if end_time:
    #     end_time = end_time.strftime(date_format)
    return mongo.get_graph_data(pid, start_time, end_time)

#post patient hourly vitals
@app.post("/graph_data")
async def post_graph_data(item: graph_data):
    mongo.post_graph_data(item)
    return item
