import React, { useState } from 'react'

export default function Filtro({ onConsultar }) {
    const [filter, setFilter] = useState('')

    const onClick = ()=>{
        onConsultar(filter)
    }

    return (
        <div className="card">
            <h6 className="card-header">Consulta de películas</h6>
            <div className="card-body">
                <h6>Ingrese nombre de la película</h6>
                <input type='text' onChange={(e)=>{setFilter(e.target.value)}} className='mx-1'></input>
                <button className="btn btn-success mx-1" onClick={onClick} >Consultar</button>
            </div>
        </div>
    )
}
