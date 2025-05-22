import "./Home.css";
import React, {useState, useEffect, useRef } from "react";
import HomeImage from "../../assets/images/HomeImage.png";
import Gsap from "../../gsap/HoldGsap";
import "./Home3D.css";
import ManageThree from "../../three js/Manage3D";
import SearchPage from "./SearchPage";
import Footer from "../footer/Footer"
import {useDispatch,useSelector} from "react-redux"
import { setURD_Fromlocal,removeURData } from '../../redux/StoreURData'

export default function Home() {
  const pointer = useRef();
  const animateElement = useRef();
  const AboutHolder = useRef();
  const MainContent = useRef();
  const Object = useRef();
  const left3D = useRef();
  const right3D =useRef();
  const dispatch=useDispatch()
  const {URData}=useSelector(state => state.UserData)

  useEffect(()=>{
    dispatch(setURD_Fromlocal())
  },[dispatch])

  useEffect(() => {
    const container = right3D.current;
    window.onload=()=>{
      if (container) {
        container.scrollLeft = container.scrollWidth;
      }
    }
  }, []);
  useEffect(() => {
    let { container } = Gsap(
      pointer.current,
      animateElement.current,
      MainContent.current,
      AboutHolder.current,
      left3D.current,
      right3D.current,
      Object.current
    );
    return () => {
      container.scrollTrigger?.kill();
    };
  }, []);

  useEffect(() => {
    ManageThree(Object);
  }, []);
  return (
    <>
    <div className="Home1">
      <main className="mainHome" ref={pointer}>
        <aside className="HomeLeft">
          <div className="structured" ref={animateElement}>
            <main ref={AboutHolder}>
              <div className="left3D" ref={left3D}>
                <div>
                  <h2>
                    Hey,
                    <br /> Architect
                  </h2>
                  <p>
                    Create, Share, and Deploy Your Own Libraries—Instantly
                  </p>
                </div>
              </div>
              <div className="main3D" ref={Object}></div>
              <div className="right3D" id="right3D" ref={right3D}>
                <div>
                <h2>
                  LET'S <br></br> DO
                </h2>
                </div>
              </div>
            </main>
          </div>
          <div className="MainContent" ref={MainContent}>
            <div className="CompanyLogo"></div>
            <div className="Top-47"></div>
            <h1>
              Hello,<br></br>Designer
            </h1>
            <p>
              hello user, i know you have good ideafor make <br></br>
              package. don’t worry this web site help you
            </p>
            <section>
              {URData ? <a href="/Account">get start</a>: <a href="/Account">get start</a>}
              {URData ? <button onClick={()=>{dispatch(removeURData())}}>logout</button>:<a href="/Login">login</a>}
            </section>
          </div>
        </aside>
        <section className="HomeRight">
          <header>
            <a href="/">HOME</a>
            <a href="/">ABOUT</a>
            <a href="/">CONTACT</a>
          </header>
          <img src={HomeImage} alt="RightHomeImage" />
        </section>
      </main>

    </div>
    <div className="Home2">

    </div>
    <SearchPage />
    <Footer />
    </>
  );
}
