import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Estudiante from "./components/Estudiante";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route></Route>
        </Routes>
      </Router>
      <Estudiante/>
    </>
  );
}

export default App;
