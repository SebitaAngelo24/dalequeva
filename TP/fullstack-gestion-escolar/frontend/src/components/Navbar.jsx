import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/estudiantes">Estudiantes</Link>
        </li>
        <li>
          <Link to="/estudiantes/crear">Crear Estudiante</Link>
        </li>
      </ul>
    </nav>
  );
}
