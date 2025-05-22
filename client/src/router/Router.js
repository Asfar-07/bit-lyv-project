import { Routes ,BrowserRouter, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
// import CreatePack from "../pages/createpack/CreatePack"
import WorkPlace from "../pages/workplace/WorkPlace"
import Account from "../pages/account/Account"
export default function Routers() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/Login" Component={Login}></Route>
            <Route path="/CreateNew" Component={WorkPlace}></Route>
            <Route path="/Account" Component={Account}></Route>
        </Routes>
        </BrowserRouter>
    )
}