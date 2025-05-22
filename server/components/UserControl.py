from components.smalloperations.help_fun import Make_Id
from components.database.MySqlDB import DataBase
import bcrypt
from pathlib import Path
mydb = DataBase()
mycursor=mydb.cursor()

def ControlLogin(userdata):
    WhereSql='SELECT * FROM UserData WHERE email=%s'
    email=(userdata['Email'],)
    mycursor.execute(WhereSql,email)
    result = mycursor.fetchone()
    if result==None:
        return {'message':"no user exist",'stutas':False}
    else:
        hash_pass=userdata["Password"].encode("utf-8")
        if bcrypt.checkpw(hash_pass,result[3].encode()):
            return {'message':"Password Manch",'status':True,'details':result}
        else:
            return {'message':"Password Not Manch",'status':False}
        


def ControlSign(userdata):
 WhereNameSql='SELECT * FROM UserData WHERE username=%s'
 username=(userdata['UserName'],)
 mycursor.execute(WhereNameSql,username)
 usernameresult = mycursor.fetchone()
 if(usernameresult==None):

    WhereEmailSql='SELECT * FROM UserData WHERE email=%s'
    email=(userdata['Email'],)
    mycursor.execute(WhereEmailSql,email)
    result = mycursor.fetchone()

    if(result==None):

        randomid=Make_Id()
        hash_pass=userdata["Password"].encode("utf-8")
        Bcrypt_pass=bcrypt.hashpw(hash_pass,bcrypt.gensalt())
        sql = "insert into UserData(_id,username,email,password) values(%s,%s,%s,%s);"
        val = (randomid,userdata['UserName'], userdata['Email'],Bcrypt_pass.decode())
        mycursor.execute(sql, val)
        mydb.commit()
        Path("packs/"+userdata['UserName']).mkdir(parents=True, exist_ok=True)
        return {'message':"new user added",'status':True,'details':val}
    
    else:
        return {'message':"Email exist",'status':False}
 else:
    return {'message':"UserName already picked",'status':False}