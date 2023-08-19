import "./App.css";
import "./assets/css/dashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Componenets/Dashboard";
import Header from "./Componenets/Header";
import CodeArea from "./Componenets/Editor";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(()=>{
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/get_data`,
      headers : {
        "Content-Type" : "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Origin",
      }
    }).then(res=>{
      console.log(res);
      
    })
  })
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/create" />
          <Route path="/editor" element={<CodeArea readOnly={false} language="plaintext"/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
