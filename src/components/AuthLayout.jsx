import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AuthLayout = ({children, authentication = true}) => {

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()
    const[loader, setLoader] = useState(true)

    useEffect(() => {
        if (authentication && authStatus !== authentication){
            navigate("/login")

        } // logic to check if user is logged in
        else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])

    return loader ? <div><h1>Loading...</h1></div> : <>{children}</>
}
 
export default AuthLayout;