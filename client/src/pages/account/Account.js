import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import "./Account.css";
import defualt_DP from "../../assets/images/defaul_dp.png";
import CreateLibraryForm from "../createlibrary/CreateLibraryForm";
import { useSelector, useDispatch } from "react-redux";
import { setURD_Fromlocal } from "../../redux/StoreURData";
import { setLiraryId } from "../../redux/StoreURData";
import { useNavigate } from "react-router-dom";
import SmallLoading from '../../components/loadingscreen/SmallLoading'
import HeaderPopUp from "../../components/popup/HeaderPopUp";
import config from "../../config.json"
// import SearchPage from "../home/SearchPage";

export default function Account() {
  const [onForm, setONForm] = useState(false);
  const [userpacks, setUserPacks] = useState([]);
  const [errorpop, setErrorPOP] = useState({
    message: "",
    stutas: false,
  });
  const [loading,setLoading]=useState(false)
  const hasRun = useRef(false);


  const dispatch = useDispatch();
  const MoveTO = useNavigate();

  useEffect(() => {
    dispatch(setURD_Fromlocal());
  }, [dispatch]);
  const { URData } = useSelector((state) => state.UserData);
  useEffect(() => {
    if (hasRun.current || !URData) return;
    hasRun.current = true;
    if (URData) {
      setLoading(true)
      axios
        .post(
          config.backendURL+"/collectpack",
          { data: URData._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((Response) => {
          setUserPacks(Response.data);
        })
        .catch((e) => {
          errorpop.stutas
            ? setErrorPOP((state) => ({ ...state, stutas: false }))
            : setErrorPOP((state) => ({ ...state, stutas: true }));
          setErrorPOP((state) => ({ ...state, message: e.message }));
          console.log(e.message);
        }).finally(()=>{
          setLoading(false)
        })
    }
  }, [URData]);
  function openWorkPlace(data) {
    dispatch(setLiraryId(data));
    MoveTO("/CreateNew");
  }
  function ShowError() {
    errorpop.stutas
      ? setErrorPOP((state) => ({ ...state, stutas: false }))
      : setErrorPOP((state) => ({ ...state, stutas: true }));
  }
  return (
    <div className="Account">
      {errorpop.stutas && (
        <HeaderPopUp message={errorpop.message} display={ShowError} />
      )}
      {loading&&
      <SmallLoading />
      }
      <nav>
        <header>
          <div className="UR_DP">
            <img src={defualt_DP} alt="" />
          </div>
          <div className="UserDetails">
            {URData && <h2>{URData.UserName}</h2>}
            <a href="/">menage account</a>
          </div>
        </header>
        <ul>
          <li>
            <i className="fa-solid fa-file"></i>PACKAGE
          </li>
          <li>
            <i className="fa-solid fa-group-arrows-rotate"></i>COMMUNITY
          </li>
          <li>
            <i className="fa-regular fa-clipboard"></i>CHALENGES
          </li>
          <li>
            <i className="fa-solid fa-user"></i>ACCOUNT
          </li>
        </ul>
      </nav>
      <aside>
        {onForm && (
          <CreateLibraryForm setDispay={setONForm} userdata={URData} />
        )}

        <header>
          <button
            onClick={() => {
              onForm ? setONForm(false) : setONForm(true);
            }}
          >
            New
          </button>
        </header>
        <main className="Dispaly_Pack">
          <h2>Package</h2>
          <section>
            {userpacks.map((value, Index) => (
              <div className="CollectionPack" key={Index}>
                <div>
                  <a
                    href={`${config.backendURL}/${value.cdn}${value.name}.${value.packtype}`}
                  >
                    {value.packtype}
                  </a>
                  <div
                    onClick={() => {
                      openWorkPlace(value);
                    }}
                  >
                    <i
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                      }}
                      className="fa-solid fa-plus"
                    ></i>
                  </div>
                  <a
                    href={`${config.backendURL}/${value.cdn}${value.name}.${value.packtype}`}
                  >
                    <i
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: "2",
                      }}
                      className="fa-solid fa-pen"
                    ></i>
                  </a>
                </div>
                <a
                  href={`${config.backendURL}/${value.cdn}${value.name}.${value.packtype}`}
                >
                  {value.name}
                </a>
              </div>
            ))}
          </section>
        </main>
      </aside>
    </div>
  );
}
