import mysql.connector
import os
from dotenv  import dotenv_values,load_dotenv
load_dotenv()
config=dotenv_values('.env')
def DataBase():
    mydb = mysql.connector.connect(
    host=os.getenv("DATA_BASE_HOST"),
    user=os.getenv("DATA_BASE_USERNAME"),
    password=os.getenv('DATA_BASE_PASSWORD'),
    database=os.getenv('DATA_BASE_NAME')
    )
    return mydb