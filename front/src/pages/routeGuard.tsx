import {useGetUserDataQuery} from "../store/api.ts";
import {Outlet, useNavigate} from "react-router-dom";

function RouteGuard() {
    const {isSuccess, isError} = useGetUserDataQuery()
    const navigate = useNavigate()

    if(!isSuccess && isError)
    {
        navigate("/auth")
    }

    return (
        <Outlet/>
    );
}

export default RouteGuard;