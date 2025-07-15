import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({children, authentication = true}) => {

  const auth = useSelector((state) => state.auth )

  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.loading) {
      if (authentication && !auth.status) {
        navigate("/login");
      } else if (!authentication && auth.status) {
        navigate("/");
      }
    }
  }, [auth.loading, auth.status, authentication, navigate]);

  if (auth.loading) {
    return <p>Loading...</p>
  } else {
    return <>{children}</>
  }
}

export default AuthLayout


// if(true){
//   if (false) {
//     navigator("/login")
//   }
// }