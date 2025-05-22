import React from 'react'
import "./SearchingPage.css"
import UserIcon from "../../assets/images/usericon.png"
import FileIcone from "../../assets/images/fileicon.png"
import ControllerIcon from "../../assets/images/controllericon.png"
import CapacityIcon from "../../assets/images/capacityicon.png"
import { useRef ,useEffect } from 'react'
import { ForSearch } from '../../gsap/HoldGsap'

export default function SearchPage() {
    const PageSearch=useRef()
    const leftDiv=useRef()
    const rightDiv=useRef()
    useEffect(()=>{
       const container= ForSearch(PageSearch.current,leftDiv.current,rightDiv.current)
       return () => {
        container.scrollTrigger?.kill();
      };
    },[])
  return (
    <div className='SearchingPage' ref={PageSearch}>
        <div className="sidevector1" ref={leftDiv}></div>
        <div className="sidevector2" ref={rightDiv}></div>
      <main>
        <h2>who your looking, we are help you</h2>
        <label htmlFor="Seach">
            <input type="text" placeholder='SEARCH'/>
            <button><i className="fa-solid fa-magnifying-glass-arrow-right"></i></button>
        </label>
        <section className="AmountCounter">
            <div>
                <img src={UserIcon} alt="icon1" />
                <label htmlFor="amount">100+</label>
                <p>USERS</p>
            </div>
            <div>
                <img src={FileIcone} style={{width:"70px",height:"70px",marginTop:"10px",marginBottom:"20px"}} alt="icon2" />
                <label htmlFor="amount">100+</label>
                <p>USERS</p>
            </div>
            <div>
                <img src={ControllerIcon} alt="icon3" />
                <label htmlFor="amount">100+</label>
                <p>USERS</p>
            </div>
            <div>
                <img src={CapacityIcon} alt="icon4" />
                <label htmlFor="amount">100+</label>
                <p>USERS</p>
            </div>
        </section>
      </main>
    </div>
  )
}
