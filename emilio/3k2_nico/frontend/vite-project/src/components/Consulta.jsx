import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Consulta.css';
import { useNavigate } from 'react-router-dom';

const Consulta = () => {
  const [obras, setObras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/obras-teatrales');
        setObras(response.data);
      } catch (error) {
        console.error('Error al obtener las obras:', error);
      }
    };

    fetchObras();
  }, []);

  return (
    <div className="consulta-container">
      <h2>Obras Teatrales Registradas</h2>
      <table className="consulta-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Director</th>
            <th>Clasificación</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra, index) => (
            <tr key={index}>
              <td>{obra.titulo}</td>
              <td>{obra.director}</td>
              <td>{obra.clasificacion.titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  className='consulta-button'  onClick={() => window.location.href = '/' } >Volver</button>
    </div>
  );
};

export default Consulta;
