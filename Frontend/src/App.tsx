import "./App.css";
import "./assets/css/dashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Componenets/Dashboard";
import Header from "./Componenets/Header";
import { useEffect } from "react";
import axios from "axios";
import { DispatchState } from "./Context/Store";
import { useAppDispatch } from "./Context/storeEvents";
import { updateUserData } from "./Context/userContext";
import { loadSnippets } from "./Context/snippetContext";
import Create from "./Componenets/Create";
// import { loadSnippets } from "./Context/snippetContext";


function App() {
  const dispatch : DispatchState = useAppDispatch();

  useEffect(()=>{
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/get_data`,
      headers : {
        "Content-Type" : "application/json",
      }
    }).then(res=>{
      // console.log(res.data);
      dispatch(updateUserData({
        username : res.data.username,
        displayname : res.data.displayname
      }))
      console.log(res.data);
      
      dispatch(loadSnippets(res.data.snippets))
    })
  }, [])

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/create" Component={Create}/>
          {/* <Route path="/editor" element={<CodeArea readOnly={false} language="plaintext"/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
