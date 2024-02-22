import React from 'react'
import ReactDOM from 'react-dom/client'
import "vite/modulepreload-polyfill"
//import App from './App.tsx'
//import './index.css'

function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
