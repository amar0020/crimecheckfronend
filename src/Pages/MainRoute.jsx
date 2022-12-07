import { Routes, Route } from "react-router-dom"
import { User } from "./user"
import { Notice } from "./notice"

export const MainRoute = ()=>{
    return (
        <Routes>
            <Route path="" element={<User />}></Route>
            <Route path="/notice" element={<Notice />}></Route>
        </Routes>
    )
}