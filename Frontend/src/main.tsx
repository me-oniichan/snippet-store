import React from 'react'
import ReactDOM from 'react-dom/client'
import 'vite/modulepreload-polyfill'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
