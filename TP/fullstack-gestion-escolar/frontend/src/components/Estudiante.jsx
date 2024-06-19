import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import estudiantesService from "../services/estudiantes.service";
import EstudianteTable from "./EstudianteTable";
import EstudianteForm from "./EstudianteForm";

export default function Estudiante() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estEdit, setEstEdit] = useState(null);
  /* const navigate = useNavigate();   */ 

  useEffect(() => {
    const getEstudiantes = async () => {
      const data = await estudiantesService.getEstudiantes();
      setEstudiantes(data);
    };
    getEstudiantes();
  }, []);

  const createEstudiante = async (estudiante) => {};

  const onUpdate = async (estudiante) => {
    const data = estudiantes.map((est) =>
      est.Id_Estudiante === estudiante.Id_Estudiante ? estudiante : est
    );
    setEstudiantes(data);
  };

  const onDelete = async (id) => {
    const isDelete = window.confirm(
      `¿Estás seguro de eliminar el estudiante con ID ${id}?`
    );
    if (isDelete) {
      //Elimina el estudiante con el ID proporcionado
      const data = estudiantes.filter(
        (estudiante) => estudiante.Id_Estudiante !== id
      );
      setEstudiantes(data);
    } else {
      return;
    }
    /* try {
        await estudiantesService.deleteEstudiante(id)
        //Actualiza la interfaz de usuario despues de la eliminacion
    } catch (error) {
        console.error(`Error al eliminar el estudiante con ID ${id}:`, error)
    } */
  };

  /* const handleEdit = (estudiante) => {
    setEstEdit(estudiante);
    navigate(`/estudiantes/editar/${estudiante.Id_Estudiante}`)
  } */

  return (
    <>
      <h1>Lista de Estudiantes</h1>
      <EstudianteTable
        estudiante={estudiantes}
        setEstEdit={setEstEdit}
        deleteEstudiante={onDelete}
      />
      <EstudianteForm
        createEstudiante={createEstudiante}
        updateEstudiante={onUpdate}
        estEdit={estEdit}
        setEstEdit={onUpdate}
      />
    </>
  );
}
