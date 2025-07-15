import { Outlet } from 'react-router-dom'
import './App.css'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { useDispatch } from 'react-redux'
import { login, logout, setLoading } from "./store/authSlice";
import { useEffect } from 'react'
import authService from './appwrite/auth'

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()  // getting user
        .then((userData) => {
          if (userData) {
            dispatch(login(userData)) // dispatching user
          } else {                    // to redux
            dispatch(logout());     
          }
        })
        .finally(() => {
          dispatch(setLoading(false)); 
        });
    }, []);

  return (
    <>
    <div>
      <Header/>
      <main className='min-h-120'>
        <Outlet />
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default App
