
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../useHooks/useAuth";

export default function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.user
            ? <Outlet/>
            : <Navigate to="/loginadmin" state={{ from: location }} replace />
    )
}
