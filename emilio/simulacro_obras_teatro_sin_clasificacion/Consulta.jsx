import React from "react";

// Consultar las obras
export default function Consulta( { rows, onVolver } ) {
  return (
    <div>
      <h4 className="text-center">Consulta de Obras</h4>
      <table className="table table-striped">
        <thead>
            <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Director</th>
                <th>Precio de Entrada</th>
                <th>Fecha Desde</th>
                <th>Fecha Hasta</th>
            </tr>
        </thead>
        <tbody>
            {
            rows && rows.map((e, index) => {
                return (
                    <tr key={index}>
                        <td>{e.Id}</td>
                        <td>{e.Titulo}</td>
                        <td>{e.Director}</td>
                        <td>{e.PrecioEntrada}</td>
                        <td>{e.FechaDesde}</td>
                        <td>{e.FechaHasta}</td>
                    </tr>
                )
            
            })
            }
        </tbody>
      </table>
        <button onClick={onVolver} className="btn btn-primary">Volver</button>
    </div>
  );
}