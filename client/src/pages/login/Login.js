import React ,{useEffect, useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { setURData } from '../../redux/StoreURData'
import "./Login.css"
import SmallLoading from '../../components/loadingscreen/SmallLoading'
import HeaderPopUp from "../../components/popup/HeaderPopUp"

export default function Login() {
  const [signup,setSignup]=useState(false)
  const [loading,setLoading]=useState(false)
  const [username,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errorpop,setErrorPOP]=useState(false)
  const [errmsg,setErrMSG]=useState(false)
  const [errcolor,setErroColor]=useState(null)
  const MoveTO=useNavigate('/')
  const dispatch=useDispatch()
  function onHandleSignUp(e){
    
    setLoading(true)
    axios.post(process.env.REACT_APP_API_URL+"/signup",{ UserName: username,Email:email,Password:password },{
      headers:{
        "Content-Type":"application/json"
      }
    }).then(Response=> {
      console.log('Server said:', Response.data);
      if(Response.data.status===true){
        MoveTO("/")
        let collectdata={
          _id:Response.data.details[0],
          UserName:Response.data.details[1],
          Email:Response.data.details[3],
        }
        dispatch(setURData(collectdata))
      }else{
        setErroColor({border:"1px solid red"})
        setErrorPOP(true)
        setErrMSG(Response.data.message)
      }
    }).catch((e)=>{
      setErrorPOP(true)
      setErrMSG(e.message)
    }).finally(()=>{
      setLoading(false)
    });
  
  }
  function onHandleLogin(){
    setLoading(true)
    axios.post(process.env.REACT_APP_API_URL+"/login",{ Email:email,Password:password },{
      headers:{
        "Content-Type":"application/json"
      }
    }).then(Response=> {
      console.log('Server said:', Response.data);
      if(Response.data.status===true){
        MoveTO('/')
        let collectdata={
          _id:Response.data.details[0],
          UserName:Response.data.details[1],
          Email:Response.data.details[2],
        }
        dispatch(setURData(collectdata))
      }else{
        setErroColor({border:"1px solid red"})
        setErrorPOP(true)
        setErrMSG(Response.data.message)
      }
    }).catch((e)=>{
      setErrorPOP(true)
      setErrMSG(e.message)
    }).finally(()=>{
      setLoading(false)
    });
  }
  useEffect(()=>{
    if (errorpop===true){
      setTimeout(() => {
        errmsg?setErrorPOP(false):setErrorPOP(true);
      }, 5000);
    }
  },[errorpop])
  function ShowError(){
    errorpop?setErrorPOP(false):setErrorPOP(true);
  }
  return (
    <div className="Login">  
      {errorpop &&<HeaderPopUp display={ShowError} message={errmsg}/>}
      {loading && <SmallLoading />}
    <div className="container1">
      <div className="backDiv">
        <div className="container4" id="container4">
        { signup ? <h2>Sign Account</h2>
        : <h2>Login Account</h2>
        }
          <form onSubmit={(e)=>{signup? onHandleSignUp():onHandleLogin();e.preventDefault()}}>
            <div>
              {signup && (
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>{setUserName(e.target.value)}}
                required
              />
              )}
              <br />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                style={errcolor}
                onChange={(e)=>{setEmail(e.target.value)}}
                required
              />
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                style={errcolor}
                onChange={(e)=>{setPassword(e.target.value)}}
                required
              />
              <br />
            </div>
            <div className="singup-part">
              {signup ?  <div onClick={()=>{signup ? (setSignup(false)) : (setSignup(true))}}>Already have account ?</div>:
               <div onClick={()=>{signup ? (setSignup(false)) : (setSignup(true))}}>Create new account ?</div>
            }
             
            </div>
            <div className="loginpart">
              {signup ? <button type="submit">Sign</button>:<button type="submit">Login</button>}
              
            </div>
          </form>
        </div>
      </div>

      <div className="frontDiv">
        <div className="sepfond">
          <p>We're thrilled to see you again.</p>
        </div>
        <h1>WELCOME BACK</h1>
        <p>We're thrilled to see you again. Please enter your credentials to access your account</p>
        <p>Don't have an account yet?</p>
      </div>
    </div>
  </div>
  )
}
