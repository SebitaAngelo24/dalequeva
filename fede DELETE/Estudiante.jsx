import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import estudiantesService from "../services/estudiantes.service";
import EstudianteTable from "./EstudianteTable";
import EstudianteForm from "./EstudianteForm";

export default function Estudiante({ setEstEdit}) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [action, setAction] = useState ("C")
  /* const navigate = useNavigate(); */    

  useEffect(() => {
    const getEstudiantes = async () => {
      const data = await estudiantesService.getEstudiantes();
      setEstudiantes(data);
    };
    getEstudiantes();
  }, []);

  const onCreate = async (estudiante) => {
    const data = estudiantesService.createEstudiante(estudiante)
    setEstudiantes([...estudiantes, data]);
    setAction("R")
  };

  const onUpdate = async (estudiante) => {
    const data = estudiantes.map((est) =>
      est.Id_Estudiante === estudiante.Id_Estudiante ? estudiante : est
    );
    setEstudiantes(data);
    setAction("A")
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

  const handleEdit = (estudiante) => {
    setEstEdit(estudiante);
    /* navigate(`/estudiantes/editar/${estudiante.Id_Estudiante}`) */
  } 

  return (
    <div>
      {
        action === "C" && (
          <>
            <h1>Lista de Estudiantes</h1>
            <button onClick={onCreate}>Registrar Estudiante</button>
            <EstudianteTable
            estudiante={estudiantes}
            handleEdit={onUpdate}
            deleteEstudiante={onDelete}></EstudianteTable>
          </>
        )
      }
      {
        action !== "C" && (
          <EstudianteForm createEstudiante={onCreate} updateEstudiante={onUpdate} estEdit={estudiantes} setEstEdit={setEstudiantes}/>
        )
       }
    </div>
  );
}
