from pymongo import MongoClient, DESCENDING
from bson import ObjectId
from data_models import *
import logging

logger = logging.getLogger(__name__)

class MongoConnector:
    def __init__(self, dbname, dbhost, dbport):
        "initialize a Mongodb connector"
        self.dbname = dbname
        self.dburl = f"mongodb://{dbhost}:{dbport}"
        self.client = None
        self.db = None
        self.connect()

    def connect(self):
        # establish db connection
        try:
            self.client = MongoClient(self.dburl)
            self.db = self.client[self.dbname]
            logger.info(f"Connected to MongoDB at {self.dburl}")
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise

    def disconnect(self):
        # close db connection
        if self.client:
            self.client.close()
            logger.info("Disconnected from MongoDB")

    def get_patient_data(self, id: int):
        try:
            self.connect()
            data = [bson2json(patient) for patient in self.db["patient_data"].find({"id": id})]
            if not data:
                logger.warning(f"No patient data found for ID: {id}")
            else:
                logger.info(f"Retrieved patient data for ID: {id}")
            return data
        except Exception as e:
            logger.error(f"Error fetching patient data for ID {id}: {e}")
            raise
        finally:
            self.disconnect()

    def post_patient_data(self, item: Patient_data):
        try:
            self.connect()
            self.db["patient_data"].insert_one(dict(item))
            logger.info(f"Posted patient data: {item}")
        except Exception as e:
            logger.error(f"Error posting patient data: {e}")
            raise
        finally:
            self.disconnect()

    # Add similar logging and connection handling for other methods...

def bson2json(document):
    # Convert ObjectId() bson format into a string for _id key.
    if '_id' in document and isinstance(document['_id'], ObjectId):
        document['_id'] = str(document['_id'])
    return document
