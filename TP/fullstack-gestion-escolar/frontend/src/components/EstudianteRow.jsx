export default function EstudianteRow({estudiante, handleEdit, deleteEstudiante}) {
    const {Id_Estudiante, Nombre, Apellido, Fecha_nacimiento, Telefono, Email, Direccion} = estudiante;
  return (
    <tr>
        <td>{Id_Estudiante}</td>
        <td>{Nombre}</td>
        <td>{Apellido}</td>
        <td>{Fecha_nacimiento}</td>
        <td>{Telefono}</td>
        <td>{Email}</td>
        <td>{Direccion}</td>
        <td>
            <button className='btn btn-primary' onClick={() => handleEdit(estudiante)}>Editar</button>
            <button className='btn btn-danger' onClick={() => deleteEstudiante(Id_Estudiante)}>Eliminar</button>
        </td>
        <td></td>
    </tr>
  )
}
