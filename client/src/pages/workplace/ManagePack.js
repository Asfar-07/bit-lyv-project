import React from "react";
import "./ManagePack.css"
import { useSelector, useDispatch } from 'react-redux'
import { AddStyle} from "../../redux/StoreURData";
import config from '../../config.json'

export default function ManagePack({data,libdata,triggersave}) {
   const dispatch = useDispatch()
  function collectdata() {
    const Data=data()
    dispatch(AddStyle(Data))
  }
  return (
    <div className="PackControl">
      <h3>Pack</h3>
      <div className="Display-path">
        <label>package path:</label><br />
        {
          libdata &&
        <input type="text" value={`${config.backendURL}/${libdata.cdn}${libdata.name}.${libdata.packtype}`} readOnly/>
         }
      </div>
      <div className="Pack-Discription">
        <label>Description:</label><br />
        <textarea id=""></textarea>
      </div>
      <button className="Pack-Save" onClick={triggersave}>Save</button>
    </div>
  );
}
