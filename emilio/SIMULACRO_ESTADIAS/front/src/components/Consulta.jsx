import React from 'react';

const Consulta = ({ rows, onVolver, onEliminar}) => {
    return (
        <div>
            <h2>Listado de Reservas</h2>
            <table>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Fecha Ingreso</th>
                        <th>Fecha Salida</th>
                        <th>Huéspedes</th>
                        <th>Tipo de Estadía</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.Dni}</td>
                                <td>{row.FechaIngreso}</td>
                                <td>{row.FechaSalida}</td>
                                <td>{row.Huespedes}</td>
                                <td>{row.TipoEstadia}</td>
                                <td>
                                <button onClick={onEliminar(row.Dni)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay reservas registradas</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={onVolver}>Volver</button>
        </div>
    );
};

export default Consulta;
