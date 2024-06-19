import React from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import ReservasService from '../services/reservas.services.js';
import Consulta from './Consulta.jsx';
import "./styles.css";

const URL = 'http://localhost:3001/reservas';


export default function Registro() {
    const [action, setAction] = useState('R');
    const [rows, setRows] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await ReservasService.saveReserva(data);
        await loadData();
        setAction('C');
    };

    const loadData = async () => {
        const reservas = await ReservasService.getReservas();
        setRows(reservas);
    };

    const onVolver = () => {
        setAction('R');
    };
    
    const deleteReservation = async (id) => {
        try {
            await fetch(`${URL}?:${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container_app'>
            {
                action === 'R' && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h5>Registro de Reserva de estadía</h5>
                        <div className="form-group">
                            <label htmlFor="Dni">DNI reserva:</label>
                            <input type="text" className="form-control" id="Dni" {...register("Dni", { required: 'Este campo es requerido' })} />
                            {errors.dni && <span className='error'>{errors.dni.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="FechaIngreso">Fecha ingreso:</label>
                            <input type="date" className="form-control" id="FechaIngreso" {...register("FechaIngreso", { required: 'Este campo es requerido' })} />
                            {errors.fechaIngreso && <span className='error'>{errors.fechaIngreso.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="FechaSalida">Fecha salida:</label>
                            <input type="date" className="form-control" id="FechaSalida" {...register("FechaSalida", { required: 'Este campo es requerido' })} />
                            {errors.fechaSalida && <span className='error'>{errors.fechaSalida.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Huespedes">Cantidad de huéspedes:</label>
                            <input type="text" className="form-control" id="Huespedes" {...register("Huespedes", { required: 'Este campo es requerido' })} />
                            {errors.huespedes && <span className='error'>{errors.huespedes.message}</span>}
                        </div>
                        <div className="form-group" >
                            <label htmlFor="stay">Tipo de estadía:</label>
                            <select className="form-control" id="TipoEstadia" {...register("TipoEstadia", { required: 'Este campo es requerido' })}>
                                <option value="Pension completa">Pensión completa</option>
                                <option value="Media pensión">Media Pensión</option>
                                <option value="Solo estadía">Solo estadía</option>
                            </select>
                            {errors.tipoEstadia && <span className='error'>{errors.tipoEstadia.message}</span>}
                        </div>
                        <div className="form-group text-center mt-3">
                            <button type="submit" className="btn btn-primary mx-1">Registrar</button>
                            <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                        </div>

                        {rows.map((row) => (
                            <tr key={row.Id}>
                                <td>{row.Id}</td>
                                <td>{row.Dni}</td>
                                <td>{row.FechaIngreso}</td>
                                <td>{row.FechaSalida}</td>
                                <td>{row.TipoEstadia}</td>
                                <td>{row.Huespedes}</td>
                                <td>
                                    <button onClick={() => deleteReservation(row.Id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </form>
                )
            }
            {
                action !== 'R' && (
                    <Consulta rows={rows} onVolver={onVolver}></Consulta>
                )
            }
        </div>
    )
}