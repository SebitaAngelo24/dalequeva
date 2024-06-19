import axios from "axios";
const url = "http://localhost:3000/gestionEscolar/estudiantes";

const getEstudiantes = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los estudiantes: ", error);
    throw error;
  }
};

const getEstudiante = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el estudiante: ", error);
    throw error;
  }
};

const createEstudiante = async (estudiante) => {
  try {
    const response = await axios.post(url, estudiante, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el estudiante: ", error);
    throw error;
  }
};

const updateEstudiante = async (id, estudiante) => {
  try {
    const response = await axios.put(`${url}/${id}`, estudiante, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estudiante: ", error);
    throw error;
  }
};

const deleteEstudiante = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el estudiante: ", error);
    throw error;
  }
};

const estudiantesService = {
  getEstudiantes,
  getEstudiante,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
};

export default estudiantesService;
