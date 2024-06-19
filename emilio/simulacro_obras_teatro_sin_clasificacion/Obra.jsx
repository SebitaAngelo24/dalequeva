// src/componentes/Obra.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import obraServices from '../services/obra.services.js'; // Asegúrate de usar el nombre de la variable de exportación
import Consulta from './Consulta';

export default function Obra() {
    const [action, setAction] = useState('R');
    const [rows, setRows] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await obraServices.saveObraTeatral(data); // Utiliza el nuevo nombre de la variable
        await loadData();
        setAction('C');
    };

    const loadData = async () => {
        const obras = await obraServices.getObrasTeatrales(); // Utiliza el nuevo nombre de la variable
        setRows(obras);
    };

    const onVolver = () => {
        setAction('R');
    };

    return (
        <div className='container_app'>
            {
                action === 'R' && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4>Registro de Obras</h4>
                        <div className='form-group'>
                            <label htmlFor='Id'> Id </label>
                            <input type='text' className='form-control' {...register('Id', { required: true })} />
                            {errors.Id && <span>Este campo es requerido</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Titulo'> Titulo </label>
                            <input type='text' className='form-control' {...register('Titulo', { required: true })} />
                            {errors.Titulo && <span>Este campo es requerido</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Director'> Director </label>
                            <input type='text' className='form-control' {...register('Director', { required: true })} />
                            {errors.Director && <span>Este campo es requerido</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='PrecioEntrada'> Precio de Entrada </label>
                            <input type='text' className='form-control' {...register('PrecioEntrada', { required: true })} />
                            {errors.PrecioEntrada && <span>Este campo es requerido</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='FechaDesde'> Fecha Desde </label>
                            <input type='text' className='form-control' {...register('FechaDesde', { required: true })} />
                            {errors.FechaDesde && <span>Este campo es requerido</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='FechaHasta'> Fecha Hasta </label>
                            <input type='text' className='form-control' {...register('FechaHasta', { required: true })} />
                            {errors.FechaHasta && <span>Este campo es requerido</span>}
                        </div> 
                        <div className="form-group text-center mt-3">
                            <button type="submit" className="btn btn-primary mx-1">Registrar</button>
                            <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                        </div>
                    </form>
                )
            }
            {
                action !== 'R' && (
                    <Consulta rows={rows} onVolver={onVolver} />
                )
            }
        </div>
    )
}
