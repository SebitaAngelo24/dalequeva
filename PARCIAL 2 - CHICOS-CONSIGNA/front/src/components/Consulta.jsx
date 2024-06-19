// import React, { useState } from 'react'

// export default function Consulta({ onConsultar }) {
//     const [filter, setFilter] = useState('')

//     const onClick = ()=>{
//         onConsultar(filter)
//     }

//     return (
//         <div className="card">
//             <h6 className="card-header">Consulta de Ingresos</h6>
//             <div className="card-body">
//                 <h6>Ingrese DNI</h6>
//                 <input type='text' onChange={(e)=>{setFilter(e.target.value)}} className='mx-1'></input>
//                 <button className="btn btn-success mx-1" onClick={onClick} >Consultar</button>
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';

export default function Consulta() {
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const response = await fetch('/ingresos');
        if (response.ok) {
          const data = await response.json();
          setIngresos(data);
        } else {
          throw new Error('Error al obtener los ingresos');
        }
      } catch (error) {
        console.error('Error al obtener los ingresos', error);
      }
    };
    fetchIngresos();
  }, []);

  const handleBack = () => {
    // Implementa aquí la lógica para regresar al componente de Registro
    // Puedes usar history.push de react-router-dom si estás en un componente enrutado
  };

  return (
    <div className="card mt-4">
      <div className="card-header">Listado de ingresos</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Hora Ingreso</th>
              <th>Proveedor</th>
              <th>Ingresa con Notebook</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ingreso, index) => (
              <tr key={index}>
                <td>{ingreso.Dni}</td>
                <td>{ingreso.HoraIngreso}</td>
                <td>{ingreso.Proveedor}</td>
                <td>{ingreso.ConNotebook ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-secondary mt-3" onClick={handleBack}>Volver</button>
      </div>
    </div>
  );
}

