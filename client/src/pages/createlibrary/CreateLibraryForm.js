import "./CreateLibraryForm.css";
import React ,{useEffect, useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { URData } from "../../redux/StoreURData";

const CreateLibraryForm = ({setDispay,userdata}) => {
 const MoveTO=useNavigate('/')
 const [formData, setFormData] = useState({
  url: "packs/"+userdata.UserName+'/',
  name: "",
  description: "",
  visibility: "private", 
  packType: "CSS"
});


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finaldata=formData
    finaldata.username=userdata.UserName
    finaldata.userid=userdata._id
    // console.log("Form submitted:", formData);
     axios.post(process.env.REACT_APP_API_URL+"/makelibrary",formData,{
      headers:{
        "Content-Type":"application/json"

      }
    }).then((Response)=>{
      MoveTO('/Account')
      setDispay(false)
      

    }).catch((e)=>{
      console.error(e)
    })
    // Add further handling here
  };

  return (
    <div className="form-container">
      <i className="fa-solid fa-x" onClick={()=>{setDispay(false)}}></i>
      <h1>Create new universe</h1>
      <p>
        A repository contains all project files, including the revision history.
        <br />
        Already have a project repository elsewhere?
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mainURL">
          <label htmlFor="url">Url</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url + formData.name}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="form_row">
          <div className="form_column">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: "calc(100% - 15px)" }}
                pattern="[A-Za-z\s]+"
                maxLength={20}
                required
              />
            </div>

            <div className="Pack_Visibility">
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === "public"}
                  onChange={handleChange}
                />
                <span>public</span>
              </label><br></br>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === "private"}
                  onChange={handleChange}
                />
                <span>private</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="file-type">
          <label htmlFor="packType">Pack Type:</label>
          <select
            name="packType"
            id="packType"
            value={formData.packType}
            onChange={handleChange}
            required
          >
            <option value="CSS">CSS</option>
            <option value="JS">JS</option>
            <option value="PYTHON">PYTHON</option>
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateLibraryForm;
