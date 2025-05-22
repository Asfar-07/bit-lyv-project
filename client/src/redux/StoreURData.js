import { createSlice } from "@reduxjs/toolkit";

const URDataSlice = createSlice({
  //For Login data
  name: "userdata",
  initialState: {
    URData: null,
  },
  reducers: {
    setURData: (state,action) => {
      state.URData=action.payload
      window.localStorage.setItem("userdata",JSON.stringify(action.payload))
    },
    removeURData: (state) => {
      state.URData=null
      window.localStorage.setItem("userdata",null)
    },
    setURD_Fromlocal:(state)=>{
      let UserData= JSON.parse(window.localStorage.getItem("userdata"))
      if(UserData){
          state.URData=UserData
      }else{
          state.URData=null
      }
  }
  },
 
});
const URPackData = createSlice({
  //For Store User Works
  name: "userpack",
  initialState: {
    URPack: [], //Collection Work
    userSelectPack:{}, //What Section Now use using//THAT Style Here
    LibraryId:null, //What Library Now using
  },
  reducers: {
    setLiraryId:(state,action)=>{
      state.LibraryId=action.payload
      window.localStorage.setItem("libraryid",JSON.stringify(action.payload))
    },
    getLiraryId_local:(state)=>{
      let LibraryId=JSON.parse(window.localStorage.getItem("libraryid"))
      if (LibraryId) {
        state.LibraryId=LibraryId
      }
    },
    CollectPack: (state, action) => {
      state.URPack[state.URPack.length] = action.payload;
    },
    AddStyle: (state, action) => {
      const { Id, styleINreact } = action.payload;
      for (let i = 0; i < state.URPack.length; i++) {
        if (Id === state.URPack[i].PackId) {
          state.URPack[i].AllPackData = styleINreact;
        }
      }
    },
    RemoveStyle:(state,action)=>{
       for (let i = 0; i < state.URPack.length; i++) {
        if (action.payload === state.URPack[i].PackId) {
          state.URPack.splice(i,1)
          if(i-1>=0 ){
              state.userSelectPack=state.URPack[i-1]
          }
        }
      }
    },
    GiveStyle_to_Select: (state, action) => {
      for (let i = 0; i < state.URPack.length; i++) {
        if (action.payload === state.URPack[i].PackId) {
          state.userSelectPack = state.URPack[i];
        }
      }
    },
  },
});
export const { setURData, removeURData,setURD_Fromlocal} = URDataSlice.actions;
export const { CollectPack, AddStyle,RemoveStyle, GiveStyle_to_Select,setLiraryId,getLiraryId_local} =URPackData.actions;
export const URData = URDataSlice.reducer;
export const URPack = URPackData.reducer;
