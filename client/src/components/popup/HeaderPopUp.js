import React from 'react'
import './HeaderPopUp.css'

export default function HeaderPopUp(props) {
  
  return (
    <>
    <div className='HeaderPopUp'>
      <i className="fa-solid fa-triangle-exclamation"></i>
      <p>{props.message}</p>
      <i className="fa-solid fa-xmark" style={{cursor:"pointer"}} onClick={()=>{props.display()}}></i>
    </div>
    </>
  )
}
