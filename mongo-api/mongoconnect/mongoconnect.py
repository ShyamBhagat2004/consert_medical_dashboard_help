from pymongo import MongoClient, DESCENDING
from bson import ObjectId
from data_models import *

class MongoConnector:

    def __init__(self, dbname, dbhost, dbport):
        "initialise a Mongodb connector"
        self.dbname = dbname
        self.dburl = f"mongodb://{dbhost}:{dbport}"
    
    def connect(self):
        #establish db connection
        self.client = MongoClient(self.dburl)
        self.db = self.client[self.dbname]

        #access collections
        self.patient_data = self.db["patient_data"]
        self.graph_data = self.db["graph_data"]
        self.need_only_data = self.db["need_only_data"]
        self.start_of_cycle_info = self.db["start_of_cycle_info"]
        self.end_of_cycle_info = self.db["end_of_cycle_info"]
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

    def get_graph_data(self, id: int, time_from = None, time_until = None):
        query = {}
        query["id"] = id
        check_timerange(query, time_from, time_until)
        self.connect()
        data = [bson2json(vital) for vital in self.graph_data.find(query)]
        self.disconnect()
        return data
    
    def post_graph_data(self, item: graph_data):
        self.connect()
        self.graph_data.insert_one(dict(item))
        self.disconnect()

def check_timerange(query, time_from, time_until):
    #Sets query date_time so that the query result will be time_from - time_until .
    if time_from or time_until:
        query["timestamp"] = {}
    if time_from:
        query["timestamp"]["$gte"] = time_from
    if time_until:
        query["timestamp"]["$lte"] = time_until

def bson2json(document):
    """Convert ObjectId() bson format into a string for _id key. This is required to return json data through the API."""
    if '_id' in document and isinstance(document['_id'], ObjectId):
        document['_id'] = str(document['_id'])
    return document
