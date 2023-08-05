import "./App.css";
import "./assets/css/dashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Componenets/Dashboard";
import Header from "./Componenets/Header";
import CodeArea from "./Componenets/Editor";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/create" />
          <Route path="/editor" element={<CodeArea readOnly={false}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
