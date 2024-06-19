import React, { act, useEffect, useState } from 'react'
import service from '../services/peliculas.service.js'
import Filtro from './Filtro'
import Tabla from './Tabla'
import Registro from './Registro'

export default function Peliculas() {
    //estado:
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')

    const loadGrid = async(filter)=>{
        const data = await service.getByFilters(filter)
        setRows(data)
    }

    useEffect(() => {
        //Función para inicializar las variables de estado el componente
        loadGrid()
    }, [])

    //funciones auxiliares:
    const onConsultar = async (filter) => {
        loadGrid(filter)
    }

    const onNewClick = () => {
        setAction('N')
    }

    const onGuardar = async (data) => {
        const result = await service.save(data)
        if (result){
            loadGrid()
            setAction('C')
        }
            
    }

    const onCancelar = () => {
        setAction('C')
    }

    const onEliminar = async(id)=>{
    await service.delete(id)
    loadGrid()
    }


    return (
        <>
            {
                action === 'C' && (
                    <>
                        <Filtro onConsultar={onConsultar}></Filtro>
                        <Tabla rows={rows} onNewClick={onNewClick} onEliminar={onEliminar}></Tabla>
                    </>
                )
            }

            {
                action !== 'C' && (
                    <>
                        <Registro onGuardar={onGuardar} onCancelar={onCancelar}></Registro>
                    </>
                )

            }
        </>
    )
}
