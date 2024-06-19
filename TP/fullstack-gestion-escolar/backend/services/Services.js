const ApiGestionEscolar = "http://localhost:3000/gestionEscolar";
//get, getById, post, put y delete

//Funcion generica para obtener todos los elementos solicitados como recurso
const getAll = async (recurso) => {
  try {
    const response = await fetch(`${ApiGestionEscolar}/${recurso}`);
    if (!response.ok) {
      throw new Error(`Error al obtener ${recurso}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en getAll: ${error.message}`);
    throw error;
  }
};

//Funcion generica para obtener un elemento solicitado por id
const getById = async (recurso, id) => {
  try {
    const response = await fetch(`${ApiGestionEscolar}/${recurso}/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error al obtener ${recurso} con id ${id}: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error en getById: ${err.message}`);
    throw err;
  }
};

//Funcion para crear o publicar un nuevo elemeto en un recurso deseado
const publicar = async (recurso, item) => {
  try {
    const response = await fetch(`${ApiGestionEscolar}/${recurso}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(`Error al crear ${recurso}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error en publicar: ${err.message}`);
    throw err;
  }
};

//Funcion para actualizar un elemento por su ID de un recurso deseado
const actualizar = async (recurso, id, item) => {
  try {
    const response = await fetch(`${ApiGestionEscolar}/${recurso}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(
        `Error al actualizar ${recurso} con id ${id}: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Funcion para borrar un elemento por su ID de un recurso deseado
const borrado = async (recurso, id) => {
  try {
    const response = await fetch(`${ApiGestionEscolar}/${recurso}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Error al borrar ${recurso} con id ${id}: ${response.statusText}`
      );
    }
    return { message: `Elemento ${recurso} con id ${id} eliminado con exito` };
  } catch (err) {
    console.error(`Error en borrado: ${err.message}`);
    throw err;
  }
};

export default { getAll, getById, publicar, actualizar, borrado };
