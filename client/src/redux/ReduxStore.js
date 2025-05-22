import {configureStore} from "@reduxjs/toolkit"
import {URData} from "./StoreURData"
import { URPack } from "./StoreURData";

const ReduxStore=configureStore({
    reducer:{
        UserData:URData,
        UserPack:URPack,
    }
})

export default ReduxStore;