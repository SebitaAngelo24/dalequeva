import { BrowserRouter as Router, Routes, Route, Link , useNavigate} from 'react-router-dom';
import Registro from './components/Registro.jsx';
import Consulta from './components/Consulta.jsx';
import './Menu.css';

const Home = () => {
  const navigate = useNavigate()}

function Menu() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/registro" className="navbar-link">Registro</Link>
            </li>
            <li className="navbar-item">
              <Link to="/consulta" className="navbar-link">Consulta</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/consulta" element={<Consulta />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Menu;
