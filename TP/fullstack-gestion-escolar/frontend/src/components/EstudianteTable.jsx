import EstudianteRow from "./EstudianteRow";

export default function EstudianteTable({
  estudiante,
  handleEdit,
  deleteEstudiante,
}) {
  return (
    <div>
      <h3>Tabla de Estudiantes</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiante && estudiante.map((est) => (
            <EstudianteRow key={est.Id_Estudiante} estudiante={est} handleEdit={handleEdit} deleteEstudiante={deleteEstudiante} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
