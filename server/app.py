from flask import Flask, request,render_template
from flask_cors import CORS
from components.UserControl import ControlLogin,ControlSign
from components.PackControl import CreateLibrary,CollectPack,LibComponents,setpacktolibrary,collectstyle
from pathlib import Path
from dotenv  import dotenv_values
import os

config=dotenv_values('.env')
app = Flask(__name__)
CORS(app,origins=[os.getenv("FORT_END_URL")])

@app.route('/', methods=['GET'])
def Home():
    if request.method=="GET":
        return render_template('Home.html')
    

@app.route('/signup', methods=['POST'])
def SignUp():
    if request.method=="POST" :
        data = request.get_json() 
        finaldata=ControlSign(data)
        return finaldata

@app.route('/login', methods=['POST'])
def Login():
    if request.method=="POST" :
        data = request.get_json() 
        finaldata=ControlLogin(data)
        return finaldata
        
@app.route('/makelibrary',methods=['POST'])
def NewLibrary():
    if request.method=="POST" :
        data = request.get_json() 
        finaldata=CreateLibrary(data)
        return finaldata

@app.route("/collectpack",methods=["POST"])
def CollectLibrary():
    if request.method=="POST" :
        data = request.get_json()
        finaldata=CollectPack(data['data'])
        return finaldata
@app.route('/packs/<username>/<filename>',methods=["GET"])
def ShowLibrary(username,filename):
    if request.method=="GET":
        f=open(f'packs/{username}/{filename}')
        filedata=f.read()
        return render_template("ShowLibrary.html",Library=filedata)

@app.route("/librarypart",methods=["POST"])
def CollectLibraryPart():
    if request.method=="POST" :
        data = request.get_json()
        finaldata=LibComponents(data)
        return finaldata
    
@app.route("/addpack",methods=['POST'])
def SavePack():
    if request.method=="POST" :
        data = request.get_json()
        finaldata=setpacktolibrary(data)
        return finaldata
    
@app.route('/collectstyle',methods=['POST'])
def GetStyle():
    if request.method=="POST" :
        data = request.get_json()
        finaldata=collectstyle(data)
        return finaldata
if __name__=="__main__":
    app.run()
