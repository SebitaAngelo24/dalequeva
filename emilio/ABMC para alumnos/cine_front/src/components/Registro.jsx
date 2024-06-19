import React from 'react'
import {useForm} from 'react-hook-form' 


export default function Registro({ onGuardar, onCancelar }) {

    const {register, handleSubmit, formState: { errors }} = useForm({})

    const onCancelarClick = () => {
        onCancelar()
    }
    const onAceptar = (item) => {
    onGuardar(item)
    }




    return (
        <>
            <div className="card">
                <div className="card-header">Datos de la película</div>
                <div className="card-body">
                    <form className='form' onSubmit={handleSubmit(onAceptar)}>
                        <div className="form-group">
                            <label htmlFor="titulo">Título</label>
                            <input type="text" className="form-control" id="titulo" placeholder="Ingrese título" {...register('titulo', {required: 'Título es requerido!'})} />
                            {errors.titulo && <span className='text-danger'>{errors.titulo.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="director">Director</label>
                            <input type="text" className="form-control" id="director" placeholder="Ingrese nombre del director" {...register('director', {required: 'Director es requerido!'})}/>
                            {errors.director && <span className='text-danger'>{errors.director.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="genero">Género</label>
                            <select id='genero' className="form-control" {...register('genero', {required: 'Género es requerido!'})}>
                                <option value={'Drama'}>Drama</option>
                                <option value={'Acción'}>Acción</option>
                                <option value={'Terror'}>Terror</option>
                                <option value={'Comedia'}>Comedia</option>
                            </select>
                            {errors.genero && <span className='text-danger'>{errors.genero.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="duracion">Duración en min.</label>
                            <input type='number' className="form-control" id='duracion' placeholder="Ingrese duración en minutos" {...register('duracion', {required: 'Duración es requerido!'})}/>
                            {errors.duracion && <span className='text-danger'>{errors.duracion.message}</span>}
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-primary mx-1">Aceptar</button>
                            <button type="button" className="btn btn-secondary mx-1" onClick={onCancelarClick}>Cancelar</button>
                        </div>    
                    </form>

                </div>
            </div>
        </>
    )
}
