// import React from 'react'
// import {useForm} from 'react-hook-form' 


// export default function Ingreso({ onGuardar, onCancelar, item }) {

//     const {register, handleSubmit, formState: { errors }} = useForm({values: item})

//     const onCancelarClick = () => {
//         onCancelar()
//     }
//     const onAceptar = (item) => {
//        onGuardar(item)
//     }


//     // Id: p.dataValues.Id,
//     // Dni: p.dataValues.Dni,
//     // HoraIngreso: p.dataValues.HoraIngreso,
//     // Proveedor: p.dataValues.Proveedor,
//     // ConNotebook: p.dataValues.ConNotebook,


//     return (
//         <>
//             <div className="card">
//                 <div className="card-header">'Ingresos'</div>
//                 <div className="card-body">
//                     <form className='form' onSubmit={handleSubmit(onAceptar)}>
//                         <div className="form-group">
//                             <label htmlFor="dni">Dni</label>
//                             <input type="text" className="form-control" id="titulo" placeholder="Ingrese dni" {...register('Dni', {required: 'Dni es requerido!'})} />
//                             {errors.dni && <span className='text-danger'>{errors.dni.message}</span>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="HoraIngreso">Hora Ingreso</label>
//                             <input type="text" className="form-control" id="horaIngreso" placeholder="Ingrese Hora Ingreso" {...register('HoraIngreso', {required: 'Hora Ingreso es requerido!'})}/>
//                             {errors.horaIngreso && <span className='text-danger'>{errors.horaIngreso.message}</span>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="Proveedor">Proveedor</label>
//                             <input type='text' className="form-control" id='proveedor' placeholder="Ingrese proveedor" {...register('proveedor', {required: 'Proveedor es requerido!'})}/>
//                             {errors.proveedor && <span className='text-danger'>{errors.proveedor.message}</span>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="ConNotebook">Ingresa con Notebook</label>
//                             <input type='checkbox' className="form-check-input" id="conNotebook" placeholder="Ingresa Con Notebook" {...register('conNotebook', {required: 'Con Notebook es requerido!'})}/>
//                             {errors.conNotebook && <span className='text-danger'>{errors.conNotebook.message}</span>}
//                         </div>    
//                         <div className="form-group">
//                             <button type="submit" className="btn btn-primary" onClick={onAceptar}>Aceptar</button>
//                             <button type="button" className="btn btn-secondary" onClick={onCancelarClick}>Cancelar</button>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//         </>
//     )
// }


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Consulta from './Consulta';
import IngresoService from '../services/services.ingreso.js'; // Importa tu servicio de ingreso

export default function Registro() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [ingresoExitoso, setIngresoExitoso] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await IngresoService.registrarIngreso(data);

      if (response) {
        alert('Registro exitoso');
        reset();
        setIngresoExitoso(true);
      } else {
        throw new Error('Error al registrar el ingreso');
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar el ingreso');
    }
  };

  return (
    <>
      {!ingresoExitoso ? (
        <div className="card">
          <div className="card-header">Seguridad. Registro de ingresos</div>
          <div className="card-body">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="Dni">DNI ingreso:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="Dni" 
                  placeholder="Ingrese DNI" 
                  {...register('Dni', { required: 'DNI es requerido!' })} 
                />
                {errors.Dni && <span className="text-danger">{errors.Dni.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="HoraIngreso">Hora ingreso [hh:mm]:</label>
                <input 
                  type="time" 
                  className="form-control" 
                  id="HoraIngreso" 
                  {...register('HoraIngreso', { required: 'Hora Ingreso es requerida!' })} 
                />
                {errors.HoraIngreso && <span className="text-danger">{errors.HoraIngreso.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="Proveedor">Proveedor (Empresa externa):</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="Proveedor" 
                  placeholder="Ingrese proveedor" 
                  {...register('Proveedor', { required: 'Proveedor es requerido!' })} 
                />
                {errors.Proveedor && <span className="text-danger">{errors.Proveedor.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="ConNotebook">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="ConNotebook" 
                    {...register('ConNotebook')} 
                  />
                  Ingresa con notebook
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Registrar</button>
                <button type="button" className="btn btn-secondary" onClick={() => reset()}>Limpiar</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Consulta />
      )}
    </>
  );
}
