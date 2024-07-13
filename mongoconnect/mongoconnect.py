from pymongo import MongoClient
from bson import ObjectId
from data_models import *

class MongoConnector:
    def __init__(self, dburl):
        "Initialize a MongoDB connector using a URL"
        self.dburl = dburl
    
    def connect(self):
        # Establish DB connection using the URL
        self.client = MongoClient(self.dburl)
        self.db = self.client.get_default_database()  # Gets the default database from the URL

        # Access collections
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
        # Close DB connection
        self.client.close()

    # The rest of the methods (`get_`, `post_` methods) remain unchanged.
