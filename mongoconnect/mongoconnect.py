from pymongo import MongoClient, DESCENDING
from bson import ObjectId
from data_models import *

class MongoConnector:

    def __init__(self, dbname, dbhost, dbport):
        "initialise a Mongodb connector"
        self.dbname = dbname
        self.dburl = f"mongodb://{dbhost}:{dbport}"
    
    def connect(self):
        # establish db connection
        self.client = MongoClient(self.dburl)
        self.db = self.client[self.dbname]

        # access collections
        self.patient_data = self.db["patient_data"]
        self.graph_data = self.db["graph_data"]
        self.start_of_cycle_info = self.db["start_of_cycle_info"]
        self.end_of_cycle_info = self.db["end_of_cycle_info"]
        self.heart_data = self.db["heart_data"]
        self.respiratory_data = self.db["respiratory_data"]
        self.blood_gasses = self.db["blood_gasses"]
        self.expelled_fluids = self.db["expelled_fluids"]
        self.need_only_data = self.db["need_only_data"]
        self.lines = self.db["lines"]

    def disconnect(self):
        #close db connection
        self.client.close()
    
    def get_patient_data(self, id: int):
        self.connect()
        data = [bson2json(patient) for patient in self.patient_data.find({"id": id})]
        self.disconnect()
        return data
    
    def post_patient_data(self, item: Patient_data):
        self.connect()
        self.patient_data.insert_one(dict(item))
        self.disconnect()

    def get_graph_data(self, id: int, start_time = None, end_time = None):
        query = prepare_query(id, start_time, end_time)
        self.connect()
        data = [bson2json(vital) for vital in self.graph_data.find(query)]
        self.disconnect()
        return data
    
    def post_graph_data(self, item: graph_data):
        self.connect()
        self.graph_data.insert_one(dict(item))
        self.disconnect()

    def get_start_of_cycle_info(self, id: int, start_time = None, end_time = None):
        query = prepare_query(id, start_time, end_time)
        self.connect()
        data = [bson2json(patient) for patient in self.start_of_cycle_info.find(query)]
        self.disconnect()
        return data

    def post_start_of_cycle_info(self, item: start_of_cycle_info):
        self.connect()
        self.start_of_cycle_info.insert_one(dict(item))
        self.disconnect()

    def get_end_of_cycle_info(self, id: int, start_time = None, end_time = None):
        query = prepare_query(id, start_time, end_time)
        self.connect()
        data = [bson2json(patient) for patient in self.end_of_cycle_info.find(query)]
        self.disconnect()
        return data

    def post_end_of_cycle_info(self, item: end_of_cycle_info):
        self.connect()
        self.end_of_cycle_info.insert_one(dict(item))
        self.disconnect()

    def get_heart_data(self, id: int, start_time = None, end_time = None):
        query = prepare_query(id, start_time, end_time)
        self.connect()
        data = [bson2json(patient) for patient in self.heart_data.find(query)]
        self.disconnect()
        return data
    
    def post_heart_data(self, item: heart_data):
        self.connect()
        self.heart_data.insert_one(dict(item))
        self.disconnect()
    
    def get_respiratory_data(self, id: int, start_time = None, end_time = None):
        query = prepare_query(id, start_time, end_time)
        self.connect()
        data = [bson2json(patient) for patient in self.respiratory_data.find(query)]
        self.disconnect()
        return data

    def post_respiratory_data(self, item: respiratory_data):
        self.connect()
        self.respiratory_data.insert_one(dict(item))
        self.disconnect()
    
    def get_blood_gasses(self, id: int, start_time = None, end_time = None):
        query = prepare_query(id, start_time, end_time)
        self.connect()
        data = [bson2json(patient) for patient in self.blood_gasses.find(query)]
        self.disconnect()
        return data
    
    def post_blood_gasses(self, item: blood_gasses):
        self.connect()
        self.blood_gasses.insert_one(dict(item))
        self.disconnect()
    
    def get_expelled_fluids(self, id: int, start_time = None, end_time = None):
        query = prepare_query(id, start_time, end_time)
        self.connect()
        data = [bson2json(patient) for patient in self.expelled_fluids.find(query)]
        self.disconnect()
        return data
    
    def post_expelled_fluids(self, item: expelled_fluids):
        self.connect()
        self.expelled_fluids.insert_one(dict(item))
        self.disconnect()

def prepare_query(id: int, start_time = None, end_time = None):
    query = {}

    # get id
    query["id"] = id
    
    # get timerange
    if start_time or end_time:
        query["datetime"] = {}
    if start_time:
        query["datetime"]["$gte"] = start_time
    if end_time:
        query["datetime"]["$lte"] = end_time

    return query


def bson2json(document):
    # Convert ObjectId() bson format into a string for _id key. This is required to return json data through the API.
    if '_id' in document and isinstance(document['_id'], ObjectId):
        document['_id'] = str(document['_id'])
    return document
