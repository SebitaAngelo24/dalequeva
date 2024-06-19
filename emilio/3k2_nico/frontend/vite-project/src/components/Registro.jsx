import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Registro.css";
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [datosObra, setDatosObra] = useState({
    Titulo: '',
    Director: '',
    FechaDesde: '',
    FechaHasta: '',
    PrecioEntrada: '',
  });

  const [registrado, setRegistrado] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatosObra({
      ...datosObra,
      [e.target.name]: e.target.value
    });

    // Limpiar errores cuando el usuario comienza a corregir el campo
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validación de tipo y restricciones
    if (typeof datosObra.Titulo !== 'string' || datosObra.Titulo.trim().length === 0 || datosObra.Titulo.length > 30) {
        validationErrors.Titulo = 'El título debe ser una cadena de caracteres con máximo 30 caracteres.';
      }
  
      if (typeof datosObra.Director !== 'string' || datosObra.Director.trim().length === 0 || datosObra.Director.length > 30) {
        validationErrors.Director = 'El director debe ser una cadena de caracteres con máximo 30 caracteres.';
      }

     // Validación de fechas
     const fechaDesdeActual = new Date(datosObra.FechaDesde);
     const fechaHoy = new Date();
     if (fechaDesdeActual <= fechaHoy) {
       validationErrors.FechaDesde = 'La fecha de inicio no puede ser anterior al día de hoy.';
     }
 
     if (fechaDesdeActual >= new Date(datosObra.FechaHasta)) {
       validationErrors.Fecha = 'La fecha de inicio debe ser anterior a la fecha de fin.';
     }
 
     if (parseFloat(datosObra.PrecioEntrada) <= 0 || isNaN(datosObra.PrecioEntrada)) {
       validationErrors.PrecioEntrada = 'El precio de entrada debe ser un número positivo.';
     }
 
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return;
     }

    try {
      await axios.post('http://localhost:3001/api/obras-teatrales', datosObra);
      setRegistrado(true);
      setErrors({});
    } catch (error) {
      console.error('Error al registrar la obra teatral:', error.message);
      // Manejo del error de conexión o servidor aquí
    }
  }

  return (
    <div className="form-container">
      <h2>Registro de Obra</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Título:</label>
          <input type="text" name="Titulo" value={datosObra.Titulo} onChange={handleChange} className="form-input" maxLength={30} />
          {errors.Titulo && <div className="form-error">{errors.Titulo}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Director:</label>
          <input type="text" name="Director" value={datosObra.Director} onChange={handleChange} className="form-input" maxLength={30} />
          {errors.Director && <div className="form-error">{errors.Director}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Fecha Desde:</label>
          <input type="date" name="FechaDesde" value={datosObra.FechaDesde} onChange={handleChange} className="form-input" />
          {(errors.Fecha || errors.FechaDesde)  && <div className="form-error">{errors.FechaDesde}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Fecha Hasta:</label>
          <input type="date" name="FechaHasta" value={datosObra.FechaHasta} onChange={handleChange} className="form-input" />
          {errors.Fecha && <div className="form-error">{errors.Fecha}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Precio de Entrada:</label>
          <input type="number" name="PrecioEntrada" value={datosObra.PrecioEntrada} onChange={handleChange} className="form-input" />
          {errors.PrecioEntrada && <div className="form-error">{errors.PrecioEntrada}</div>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="form-submit">Registrar</button>
          <button type="button" className="form-submit" onClick={() => navigate('/')}>Volver</button>
        </div>
      </form>
      {registrado && <p>La obra se registró correctamente</p>}
    </div>
  );
}

export default Registro;