import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Union, List
from datetime import datetime

# Load the JSON data
with open('example_data.json') as f:
    data = json.load(f)

app = FastAPI()

class Record(BaseModel):
    AN: int
    Temperature: int
    AP_SF: int
    LowerVal: int
    HigherVal: int

@app.get("/")
async def root():
    return {"message": "API is running"}

# Read data for a specific time
@app.get("/data/{graph}/{time}", response_model=Dict[str, Union[int, float]])
async def read_data(graph: str, time: str):
    if graph in data and time in data[graph][0]:
        return data[graph][0][time]
    else:
        raise HTTPException(status_code=404, detail="Item not found")

# Write data for a specific time
@app.post("/data/{graph}/{time}")
async def write_data(graph: str, time: str, record: Record):
    if graph in data:
        data[graph][0][time] = record.dict()
        with open('data.json', 'w') as f:
            json.dump(data, f, indent=4)
        return {"message": "Record added/updated successfully"}
    else:
        raise HTTPException(status_code=404, detail=f"Graph <{graph}> not found")

# Get temperature data for all times
@app.get("/temperatures/{graph}", response_model=List[Dict[str, Union[str, int]]])
async def get_temperatures(graph: str):
    if graph in data:
        temperature_data = [{"time": time, "Temperature": values["Temperature"]} for time, values in data[graph][0].items()]
        return temperature_data
    else:
        raise HTTPException(status_code=404, detail=f"Graph <{graph}> not found")

# Get data for a specific day
@app.get("/data/{graph}/day/{day}", response_model=Dict[str, Dict[str, Union[int, float]]])
async def get_data_by_day(graph: str, day: str):
    if graph in data:
        # Assuming day is in format "YYYY-MM-DD" and matches with the data keys
        day_data = {time: values for time, values in data[graph][0].items() if time.startswith(day)}
        if not day_data:
            raise HTTPException(status_code=404, detail="No data found for the specified day")
        return day_data
    else:
        raise HTTPException(status_code=404, detail=f"Graph <{graph}> not found")

# Write data for the current hour (rounded backward)
@app.post("/data/{graph}/current")
async def write_current_data(graph: str, record: Record):
    if graph in data:
        current_time = datetime.now().strftime("%H:00")
        data[graph][0][current_time] = record.dict()
        with open('data.json', 'w') as f:
            json.dump(data, f, indent=4)
        return {"message": "Record added/updated successfully for current hour"}
    else:
        raise HTTPException(status_code=404, detail=f"Graph <{graph}> not found")

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
