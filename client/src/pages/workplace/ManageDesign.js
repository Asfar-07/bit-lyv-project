import React, { useState, useEffect } from "react";
import "./ManageDesign.css";
import { useCallback, useRef } from 'react';

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debounced = useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debounced;
};


export default React.memo( function ManageDesign({
  usewidth,
  useheight,
  movecolor,
  getFontProp,
  setIdName,
  givestyleid,
  giveStyleSetup,
}) {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(50);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontStyle, setFontStyle] = useState("regular");
  const [fontSize, setFontSize] = useState(20);
  const [hexbg, setHexBg] = useState('#ffffff');
  const [opacitybg, setOpacityBg] = useState(100);


  function rgbaToHex(color) {
   const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  
  // If not an RGB(A) string, return original value
  if (!match) return color;

  // Extract and convert RGB values
  const [, r, g, b] = match.map(Number);
  return (
    '#' +
    [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
  );
  }
  function seperatePX(data){
      return data.split("px")[0]
  }
  useEffect(()=>{
    const rgbBg=rgbaToHex(giveStyleSetup.backgroundColor)
    setHexBg(rgbBg)
    const rgbFC=rgbaToHex(giveStyleSetup.color)
    setFontColor(rgbFC)
    setWidth(seperatePX(giveStyleSetup.width))
    setHeight(seperatePX(giveStyleSetup.height))
    setFontSize(seperatePX(giveStyleSetup.fontSize))
  },[giveStyleSetup])



  const debouncedSetColor = useDebounce((hex,opc) => {
    setHexBg(hex)
    movecolor(hex,opc);
  }, 50);
  const debouncedSetOpacity = useDebounce((hex,opc) => {
    setOpacityBg(opc)
    movecolor(hex,opc);
  }, 5);

  const debouncedSetFond = useDebounce((fontColor,fontStyle,fontSize) => {
    setFontColor(fontColor)
    setFontSize(fontSize)
    getFontProp({ fontColor, fontStyle, fontSize });
  }, 50);

  return (
    <div className="Manage-Design">
      <h3>Design</h3>
      {/* <select name="" id="">
        <option value="">Button</option>
        <option value="">Font</option>
        <option value="">Other</option>
      </select> */}
      <div className="Make_idname">
        <button
          onClick={() => {
            if (givestyleid[0] === ".") {
              setIdName(["#", givestyleid[1]]);
            } else {
              setIdName([".", givestyleid[1]]);
            }
          }}
        >
          {givestyleid[0]}
        </button>
        <input
          type="text"
          value={givestyleid[1]}
          placeholder="Enter class or id name"
        readOnly/>
      </div>
      <div className="Fill-Color">
        <label htmlFor="Pick-Color">Fill</label>
        <br />
        <section>
          <input
            type="color"
            id="Pick-Color"
            value={hexbg}
            onChange={(event) => {
              debouncedSetColor(event.target.value,opacitybg);
              setHexBg(event.target.value)
            }}
          />
          <input type="text" value={hexbg} id="Pick-Color-Hex"  readOnly />
          <input
            type="number"
            id="Pick-Opacity"
            value={opacitybg}
            min={0}
            max={100}
            onChange={(event) => {
              debouncedSetOpacity(hexbg,event.target.value);
              
            }}
          />
          <p>%</p>
        </section>
      </div>
      <div className="Font-area">
        <label htmlFor="">Font</label>
        <section>
          <input
            type="color"
            id="Pick-Color-Font"
            value={fontColor}
            onChange={(event) => {
              debouncedSetFond(event.target.value,fontStyle,fontSize);
            }}
          />
          <select name="" id="Pick-Color-Hex-Font">
            <option value="">Regular</option>
            <option value="">Italian</option>
          </select>
          <input
            type="number"
            id="Pick-Font_size"
            value={fontSize}
            min={0}
            max={80}
            onChange={(event) => {
              debouncedSetFond(fontColor,fontStyle,event.target.value);
            }}
          />
          <p>px</p>
        </section>
      </div>
      <div className="Modify-structure">
        <div>
          <label>Width:</label>
          <input
            type="number"
            value={width}
            min={1}
            max={500}
            onChange={(event) => {
              setWidth(event.target.value);
              usewidth(event.target.value);
            }}
          />
        </div>
        <div>
          <label>height:</label>
          <input
            type="number"
            value={height}
            min={1}
            max={200}
            onChange={(event) => {
              setHeight(event.target.value);
              useheight(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="make-after">
        <label htmlFor="">after:</label>
        <input type="checkbox" />
      </div>
      <div className="make-before">
        <label htmlFor="">before:</label>
        <input type="checkbox" />
      </div>
      {/* <div className="Design-Button">
        <button>Add Pack</button>
      </div> */}
    </div>
  );
}
)
