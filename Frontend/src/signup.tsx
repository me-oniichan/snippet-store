
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'vite/modulepreload-polyfill'
import './index.css'
import SignupPage from './components/Login/Signup'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SignupPage/>
  </React.StrictMode>,
)
