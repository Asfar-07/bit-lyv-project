import React, { useState, useEffect } from "react";
import "./CreatePack.css";
import IDChip from "../../assets/images/IDchip.png";
import axios from "axios";


const CreatePack = ({ IdValue, GetPackData, Library }) => {
  const [newbutton, setNewButton] = useState(true);
  const [packdata, setPackData] = useState({
    Name: "",
    packtype: "",
    Selector: "",
  });
  const [libparts, setLibParts] = useState([]);
  useEffect(() => {
    if (Library) {
      axios
        .post(process.env.REACT_APP_API_URL+"/librarypart", Library, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((Response) => {
          setLibParts(Response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [Library]);

  function handlingForm(e) {
    const { name, value } = e.target;
    setPackData((pre) => ({ ...pre, [name]: value }));
  }
  function PackData() {
    const Data = {
      PackId: IdValue,
      PackName: packdata.Name,
      packType: packdata.packtype,
      selected: packdata.Selector,
      new: newbutton,
    };
    GetPackData(Data);
  }
  return (
    <div className="CreatePack">
      <h1>New Section</h1>
      <form onSubmit={PackData}>
        <section className="Select-Work">
          {newbutton ? (
            <samp
              style={{ backgroundColor: "rgba(255, 135, 231, 1)" }}
              onClick={() => {
                setNewButton(false);
              }}
            >
              new
            </samp>
          ) : (
            <samp
              onClick={() => {
                setNewButton(true);
              }}
            >
              new
            </samp>
          )}
          <p>/</p>
          {newbutton ? (
            <select
              value={packdata.Selector}
              name="Selector"
              onChange={handlingForm}
            >
              <option value="none">none</option>
            </select>
          ) : (
            libparts.length !== 0 &&
            (libparts[0].length !== 0 || libparts[1].length !== 0) && (
              <select
                name="Selector"
                value={packdata.Selector}
                onChange={handlingForm}
              >
                {libparts.map((item) =>
                  item.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))
                )}
              </select>
            )
          )}
        </section>
        {newbutton && (
          <section className="Add-details">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="Name"
                value={packdata.Name}
                onChange={handlingForm}
                required
              />
              ;
            </div>
            <div>
              <label>Type:</label>
              <input
                type="text"
                name="packtype"
                value={packdata.packtype}
                onChange={handlingForm}
                required
              />
              ;
            </div>
          </section>
        )}
        <section className="Make-Id">
          <img src={IDChip} alt="Id-Image" />
          <h2>{IdValue}</h2>
        </section>
        <div className="Make-pack-btn">
          <button>make section{"->"}</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePack;
