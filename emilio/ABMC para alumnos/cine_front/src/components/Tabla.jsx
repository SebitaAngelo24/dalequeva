import React from 'react'

export default function Tabla(props) {

    const onEliminarClick = (id)=>{
        if(window.confirm('Seguro que desea eliminar la pelicula?'))
            props.onEliminar(id)
    }

    const tbody = props.rows.map(e =>
        <tr key={e.id}>
            <td>{e.titulo}</td>
            <td>{e.director}</td>
            <td>{e.genero}</td>
            <td>{e.duracion}</td>
            <td>
                <button className='btn btn-danger' onClick={onEliminarClick}>Eliminar</button>
            </td>
        </tr>
    );

    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Resutados:</span>
                    <button type="button" className="btn btn-primary" onClick={props.onNewClick}>Nuevo</button>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Director</th>
                                <th scope="col">Género</th>
                                <th scope="col">Duración</th>
                                <th scope="col">Acciones</th>
                                
                            </tr>
                        </thead>
                        <tbody>{tbody}</tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
