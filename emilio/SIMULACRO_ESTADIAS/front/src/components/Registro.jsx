import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import reservas from '../services/reservas.services';
import Consulta from './Consulta';
import './styles.css';

function Registro() {
    // mantener el estado y valores
    const [action, setAction] = useState('R')
    // manejo de formulario
    const [rows, setRows] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        loadData();
    }, [])



    const onSubmit = async (data) => {
        const res = await reservas.saveReserva(data);
        await loadData();
        setAction('C');
    };

    const loadData = async () => {
        const data = await reservas.getReservas();
        setRows(data);
    }

    const onVolver = () => {
        setAction('R');
    }

    //const onEliminar = async (id) => {
    //   await reservas.deleteReserva(id);
    //    await loadData();
    //};

    return (
        <div className='container_app'>
            {
                action === 'R' && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h5>Registro de Reserva de estadía</h5>
                        <div className="form-group">
                            <label htmlFor="Dni">DNI reserva:</label>
                            <input type="text" className="form-control" id="Dni"  {...register("Dni", { required: 'Este campo es requerido' })} />
                            {errors.dni && <span className='error'>{errors.dni.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="FechaIngreso">Fecha Ingreso:</label>
                            <input type="date" className="form-control" id="FechaIngreso"  {...register("FechaIngreso", { required: 'Este campo es requerido' })} />
                            {errors.fechaIngreso && <span className='error'>{errors.fechaIngreso.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="FechaSalida">FechaSalida:</label>
                            <input type="date" className="form-control" id="FechaSalida"  {...register("FechaSalida", { required: 'Este campo es requerido' })} />
                            {errors.fechaSalida && <span className='error'>{errors.fechaSalida.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Huespedes">Huespedes:</label>
                            <input type="number" className="form-control" id="Huespedes"  {...register("Huespedes", { required: 'Este campo es requerido' })} />
                            {errors.huespedes && <span className='error'>{errors.huespedes.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="TipoEstadia">Tipo de estadía:</label>
                            <select className="form-control" id="TipoEstadia" {...register("TipoEstadia", { required: 'Este campo es requerido' })}>
                                <option value="Pension completa">Pensión completa</option>
                                <option value="Media pensión">Media Pensión</option>
                                <option value="Solo estadía">Solo estadía</option>
                            </select>
                            {errors.tipoEstadia && <span className='error'>{errors.tipoEstadia.message}</span>}

                            <div className="form-group text-center mt-3">
                                <button type="submit" className="btn btn-primary mx-1">Registrar</button>
                                <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                            </div>
                        </div>

                    </form>
                )
            }
            {
                action !== 'R' && (
                    <Consulta rows={rows} onVolver={onVolver}></Consulta>
                )
            }
        </div >
    )
}

export default Registro;
