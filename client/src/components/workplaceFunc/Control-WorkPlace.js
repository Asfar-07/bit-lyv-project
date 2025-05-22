export default {
  hexToRgba: (hex, alpha) => {
    alpha = alpha / 100;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
  MakeNewPack: (popnewpack, setPopNewPack, setPackId) => {
    popnewpack ? setPopNewPack(false) : setPopNewPack(true);
    let value = "";
    for (var j = 1; j <= 12; j++) {
      value += String(Math.floor(Math.random() * 10));
      if (j === 4 || j === 8) {
        value += "-";
      }
    }
    setPackId(value);
  },
  DispalyStyle:(DesignButton,DispalyCode,which_Style_Add)=>{
    if (DesignButton.current) {
        const styles = window.getComputedStyle(DesignButton.current);
        let allStyles = "";
        let setstyle = {};
        for (let prop of styles) {
          for (let select of which_Style_Add) {
            if (select === prop) {
              let value = styles.getPropertyValue(prop);
              setstyle[prop] = value;
              allStyles += `${prop}: ${value}; \n`;
            }
          }
        }
        DispalyCode.current.value = allStyles;
      }
  },
  convertToReactStyle:(cssObj)=>{
  const camelCaseStyle = {};

  for (const key in cssObj) {
    const camelKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    camelCaseStyle[camelKey] = cssObj[key];
  }

  return camelCaseStyle;
}
};
