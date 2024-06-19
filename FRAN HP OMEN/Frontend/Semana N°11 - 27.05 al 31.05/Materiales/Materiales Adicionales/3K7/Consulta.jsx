import React from 'react'

export default function Consulta({rows, onVolver}) {
    return (
        <div>
            <h5 className='text-center'>Listado de reservas</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Dni</th>
                        <th>Fecha ingreso</th>
                        <th>Fecha salida</th>
                        <th>Tipo de servicio</th>
                        <th>Huespedes</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    rows && rows.map((e, index) => {
                        return(
                            <tr key={index + 1}>
                                <td>{e.Dni}</td>
                                <td>{e.FechaIngreso}</td>
                                <td>{e.FechaSalida}</td>
                                <td>{e.TipoEstadia}</td>
                                <td>{e.Huespedes}</td>
                            </tr>
                        )
                    })
                   }
                </tbody>
            </table>
            <button style={{ textAlign: 'center' }} onClick={onVolver} className='btn btn-secondary'>Volver</button>
        </div>
    )
}
