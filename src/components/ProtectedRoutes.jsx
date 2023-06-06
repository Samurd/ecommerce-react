import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
    const token = localStorage.getItem("tokenUser");
    if(token) {
        return <Outlet />
    } else {
        return <Navigate to="/login"/>
    }
}