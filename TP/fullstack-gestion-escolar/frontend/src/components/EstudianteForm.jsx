import { useEffect, useState } from 'react';
import {set, useForm} from 'react-hook-form';
import estudiantesService from '../services/estudiantes.service';

export default function EstudianteForm({ createEstudiante, updateEstudiante, estEdit, setEstEdit}) {
  const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm();
  const [rows, setRows] = useState([])

  
  useEffect(() => {
    if (estEdit) {
        reset(estEdit)
    } else {
        reset({
            Id_Estudiante: null,
            Nombre: '',
            Apellido: '',
            Fecha_nacimiento: '',
            Telefono: '',
            Email: '',
            Direccion: ''
        })
    }
  }, [estEdit, reset]) 

  const onSubmit = async (data) => {
    const newEstudiante = {
        Id_Estudiante: data.Id_Estudiante,
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Fecha_nacimiento: data.Fecha_nacimiento,
        Telefono: data.Telefono,
        Email: data.Email,
        Direccion: data.Direccion
    }
    if(estEdit) {
        await estudiantesService.updateEstudiante(estEdit.Id_Estudiante, newEstudiante)
        setEstEdit(null)
    } else {
        await estudiantesService.createEstudiante(newEstudiante)
    }
    const estudiante = await estudiantesService.getEstudiantes()
    setRows(estudiante)
  }
   
  return (
    <div>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
            <h5>{estEdit ? "Editar Estudiante" : "Registro de Estudiante"}</h5>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" name="name" id="Nombre" {...register("Nombre", {required: "Este campo es requerido"})}/>
                {errors.Nombre && <span className='error'>{errors.Nombre.message}</span> }
            </div>
            <div>
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" id="Apellido" {...register("Apellido", {required: "Este campo es requerido"})}/>
                {errors.Apellido && <span className='error'>{errors.Apellido.message}</span> }
            </div>
            <div>
                <label htmlFor="Fecha_nacimiento">Fecha de nacimiento:</label>
                <input type="date" id="Fecha_nacimiento" {...register("Fecha_nacimiento", {required: "Este campo es requerido"})}/>
                {errors.Fecha_nacimiento && <span className='error'>{errors.Fecha_nacimiento.message}</span> }
            </div>
            <div>
                <label htmlFor="telefono">Telefono:</label>
                <input type="tel" name="name" id="Telefono" {...register("Telefono", {required: "Este campo es requerido"})}/>
                {errors.Telefono && <span className='error'>{errors.Telefono.message}</span> }
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="Email" {...register("Email", {required: "Este campo es requerido"})}/>
                {errors.Email && <span className='error'>{errors.Email.message}</span> }
            </div>
            <div>
                <label htmlFor="direccion">Direccion:</label>
                <input type="address" id="Direccion" {...register("Direccion", {required: "Este campo es requerido"})}/>
                {errors.Direccion && <span className='error'>{errors.Direccion.message}</span> }
            </div>
            <button type='submit'>{estEdit ? "Actualizar" : "Registrar"}</button>
            {estEdit && <button type="button" onClick={() => setEstEdit(null)}>Cancelar</button>}
        </form>
    </div>
  )
}
