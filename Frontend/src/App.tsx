import "./App.css";
import "./assets/css/dashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Componenets/Dashboard";
import Header from "./Componenets/Header";
import Create from "./Componenets/Create";
// import { loadSnippets } from "./Context/snippetContext";


function App() {

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
