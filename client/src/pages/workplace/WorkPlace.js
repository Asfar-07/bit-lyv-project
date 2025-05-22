import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import "./WorkPlace.css";
import ManagePack from "./ManagePack";
import ManageDesign from "./ManageDesign";
import CreatePack from "../createpack/CreatePack";
import { useSelector, useDispatch } from "react-redux";
import ControlWorkPlace from "../../components/workplaceFunc/Control-WorkPlace";
import config from '../../config.json'
import { getLiraryId_local } from "../../redux/StoreURData";
import {
  CollectPack,
  AddStyle,
  RemoveStyle,
  GiveStyle_to_Select,
} from "../../redux/StoreURData";

export default React.memo(function WorkPlace() {
  const [displayId, setDisplayId] = useState([".", "main"]);
  const [popnewpack, setPopNewPack] = useState(false);
  const [packid, setPackId] = useState();
  const [allpack, setAllPack] = useState([]);
  const [thisId, setThisId] = useState();
  const [limitSection, setLimitSection] = useState(false);
  const [styleINreact, setStyleINReact] = useState({
    backgroundColor: "rgb(255, 255, 255, 1)",
    color: "#000000",
    fontSize: "20px",
    height: "50px",
    width: "100px",
  });
  const [activeIndex, setActiveIndex] = useState(null);

  const DesignButton = useRef(null);
  const DispalyCode = useRef();

  // const Stroge = useSelector((state) => state.UserPack.URPack);
  const SectionPack = useSelector((state) => state.UserPack.userSelectPack);
  const AllPack = useSelector((state) => state.UserPack.URPack);
  const Library = useSelector((state) => state.UserPack.LibraryId);
  const dispatch = useDispatch();
  const [which_Style_Add, setWhich_Style_Add] = useState([
    "height",
    "width",
    "background-color",
    "color",
    "font-size",
  ]);
  useEffect(() => {
    dispatch(getLiraryId_local());
  }, []);

  useEffect(() => {
    if (SectionPack.AllPackData) {
      setActiveIndex(SectionPack.PackId);
      setStyleINReact(SectionPack.AllPackData);
    }
  }, [SectionPack]);

  useEffect(() => {
    if (AllPack.length == 5) {
      setLimitSection(true);
    } else {
      setLimitSection(false);
    }
    if (AllPack.length <= 0) {
      ControlWorkPlace.MakeNewPack(popnewpack, setPopNewPack, setPackId);
    }
  }, [AllPack]);

  useEffect(() => {
    if (styleINreact) {
      ControlWorkPlace.DispalyStyle(DesignButton, DispalyCode, which_Style_Add);
    }
  }, [styleINreact]);

  function onhandlingbgColor(hex, opc) {
    const rgbcode = ControlWorkPlace.hexToRgba(hex, opc);
    setStyleINReact((prev) => ({
      ...prev,
      backgroundColor: rgbcode,
    }));
  }

  const manageWidth = (data) => {
    setStyleINReact((prev) => ({
      ...prev,
      width: data + "px",
    }));
  };
  const manageHeight = (data) => {
    setStyleINReact((prev) => ({
      ...prev,
      height: data + "px",
    }));
  };
  const manageFont = (data) => {
    setStyleINReact((prev) => ({
      ...prev,
      color: data.fontColor,
      fontSize: data.fontSize + "px",
    }));
  };
  const GetPackData = (value) => {
    //Make New Section Function
    popnewpack ? setPopNewPack(false) : setPopNewPack(true);
    if (value.new) {
      setDisplayId(() => {
        let next = [...displayId];
        next[1] = value.PackName;
        return next;
      });

      dispatch(CollectPack(value));
      setThisId(value.PackId);
      setAllPack(() => {
        let next = [...allpack];
        next[next.length] = value;
        return next;
      });
      setActiveIndex(value.PackId);
      dispatch(
        AddStyle({
          Id: value.PackId,
          styleINreact: {
            backgroundColor: "rgb(255, 255, 255 ,1)",
            color: "#000000",
            fontSize: "20px",
            height: "50px",
            width: "100px",
          },
        })
      );
      dispatch(GiveStyle_to_Select(value.PackId));
    } else {
      value.PackName = value.selected;
      axios
        .post(
          config.backendURL+"/collectstyle",
          { libdata: Library, selector: value.selected },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((Response) => {
          console.log(Response.data)
          const StyleData = ControlWorkPlace.convertToReactStyle(Response.data);
          dispatch(CollectPack(value));
          setThisId(value.PackId);
          setAllPack(() => {
            let next = [...allpack];
            next[next.length] = value;
            return next;
          });
          setActiveIndex(value.PackId);
          dispatch(
            AddStyle({
              Id: value.PackId,
              styleINreact:StyleData,
            })
          );
          dispatch(GiveStyle_to_Select(value.PackId));
        });
    }
  };
  const SelectSection = (value) => {
    setThisId(value);
    dispatch(AddStyle({ Id: thisId, styleINreact }));
    dispatch(GiveStyle_to_Select(value));
  };
  const GiveAllPackData = () => {
    return { Id: thisId, styleINreact };
  };
  const RemoveSection = (id) => {
    dispatch(RemoveStyle(id));
  };
  function SavePack() {
    if (DispalyCode && displayId) {
      let collectdata = {};
      let arrstyle = `${displayId[0]}${displayId[1]}{
    ${DispalyCode.current.value}
    }`;
      collectdata.libdata = Library;
      collectdata.style = arrstyle;
      axios
        .post(config.backendURL+"/addpack", collectdata, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((Response) => {
          console.log(Response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  return (
    <div className="WorkPlace">
      <Header />
      <main>
        {popnewpack && (
          <CreatePack
            IdValue={packid}
            GetPackData={GetPackData}
            Library={Library}
          />
        )}
        <header className="Create-new-work">
          <ul>
            {allpack.map((item, index) => (
              <li
                key={index}
                style={{
                  backgroundColor:
                    activeIndex === item.PackId ? "lightgreen" : "white",
                }}
              >
                <div
                  onClick={() => {
                    SelectSection(item.PackId);
                    setActiveIndex(item.PackId);
                  }}
                >
                  {item.PackName}
                </div>
                <p
                  onClick={(event) => {
                    RemoveSection(item.PackId);
                    event.target.parentElement.remove();
                  }}
                ></p>
              </li>
            ))}
          </ul>
          {!limitSection && (
            <button
              onClick={() => {
                dispatch(AddStyle({ Id: thisId, styleINreact }));
                dispatch(GiveStyle_to_Select(thisId));
                ControlWorkPlace.MakeNewPack(
                  popnewpack,
                  setPopNewPack,
                  setPackId
                );
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </header>
        <aside className="Display-Work">
          <section>
            <ManagePack
              data={GiveAllPackData}
              libdata={Library}
              triggersave={SavePack}
            />
          </section>
          <section>
            <div className="Display-design">
              <button
                style={{
                  width: styleINreact.width,
                  height: styleINreact.height,
                  backgroundColor: styleINreact.backgroundColor,
                  color: styleINreact.color,
                  fontSize: styleINreact.fontSize,
                }}
                ref={DesignButton}
              >
                Button
              </button>
            </div>
            <div className="Manage-code">
              <section className="main-name">
                {displayId[0]}
                {displayId[1]}
                {"{"}
              </section>
              <textarea className="Code-Main" ref={DispalyCode}></textarea>
              <section>{"}"}</section>
            </div>
          </section>
          <section>
            <ManageDesign
              usewidth={manageWidth}
              useheight={manageHeight}
              movecolor={onhandlingbgColor}
              getFontProp={manageFont}
              setIdName={setDisplayId}
              givestyleid={displayId}
              giveStyleSetup={styleINreact}
            />
          </section>
        </aside>
      </main>
    </div>
  );
});
