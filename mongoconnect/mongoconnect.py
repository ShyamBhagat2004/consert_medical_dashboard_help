from pymongo import MongoClient
from bson import ObjectId
from data_models import *

class MongoConnector:
    def __init__(self, dburl, dbname):
        "Initialize a MongoDB connector using a URL and a database name"
        self.dburl = dburl
        self.dbname = dbname  # store the database name

    def connect(self):
        # Establish DB connection using the URL and specific database name
        self.client = MongoClient(self.dburl)
        self.db = self.client[self.dbname]  # Connect to the specified database

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

    # Implement other methods (`get_`, `post_` methods) as needed, keeping the structure similar.
