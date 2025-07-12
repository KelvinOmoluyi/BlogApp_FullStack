import { Outlet } from 'react-router-dom'
import './App.css'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { useDispatch } from 'react-redux'
import { login, logout } from "./store/authSlice";
import { useEffect } from 'react'
import authService from './appwrite/auth'

function App() {

    const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.getCurrentUser(); // ✅ If logged in, returns user
        dispatch(login(user));            // 🔁 Restore auth state
      } catch (err) {
        dispatch(logout());               // ❌ No session, ensure logout
      }
    };

    checkSession();
  }, []);

  return (
    <>
    <div>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default App
