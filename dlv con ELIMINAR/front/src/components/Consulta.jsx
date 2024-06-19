export default function Consulta({ rows, onVolver, onEliminar}) {
    const tbody = rows.map(r => (
        <tr key={r.Id}>
            <td>{r.Dni}</td>
            <td>{r.HoraIngreso}</td>
            <td>{r.Proveedor}</td>
            <td>{r.ConNotebook ? "True" : "False"}</td>
            <td><button className='btn btn-danger' onClick={() => onEliminar(r.Id)}>Eliminar</button>                                    </td>
        </tr>
    ))

return (
    <div>
        <div className='card'>
            <div className='card-header d-flex justify-content-between align-items-center'>
                <h1>Listado de ingresos</h1>
            </div>
            <div className='card-body'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Dni</th>
                            <th>Hora Ingreso</th>
                            <th>Proveedor</th>
                            <th>Ingresa con notebook</th>
                        </tr>
                    </thead>
                    <tbody>{tbody}</tbody>
                </table>
            </div>
            <div className='card-footer'>
                <button className='btn btn-secondary' onClick={onVolver}>Volver</button>
            </div>
        </div>
    </div>
  )
}