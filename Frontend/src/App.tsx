import { useEffect } from 'react'
import './App.css'
import LoginPage from './components/Login/Login'

function App() {
  useEffect(()=>{
    const root = window.document.documentElement;
    root.classList.add('dark');
  }, [])
  return(
    <>
      <LoginPage />
    </>
  )
}

export default App
