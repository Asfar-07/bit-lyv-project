import mysql.connector
from dotenv  import dotenv_values,load_dotenv
load_dotenv()
config=dotenv_values('.env')
def DataBase():
    mydb = mysql.connector.connect(
    host=config["DATA_BASE_HOST"],
    user=config["DATA_BASE_USERNAME"],
    password=config['DATA_BASE_PASSWORD'],
    database=config['DATA_BASE_NAME']
    )
    return mydb