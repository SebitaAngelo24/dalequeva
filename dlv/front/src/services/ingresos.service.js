// import axios from "axios";
// const url = "http://localhost:3001/ingresos";

// const getIngresos = async () => {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener todos los ingresos: ", error);
//     throw error;
//   }
// };

// const saveIngreso = async (ingreso) => {
//   try {
//     const response = await axios.post(url, ingreso, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error al crear el ingreso: ", error);
//     throw error;
//   }
// };

// const ingresosService = {
//   getIngresos,
//   saveIngreso,
// };

// export default ingresosService;



const API_URL = 'http://localhost:3001/ingresos';

const getIngresos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener todos los ingresos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener todos los ingresos: ', error);
    throw error;
  }
};

const saveIngreso = async (ingreso) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingreso),
    });

    if (!response.ok) {
      throw new Error('Error al crear el ingreso');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear el ingreso: ', error);
    throw error;
  }
};

// AGREGUE ESTE PARA ELIMINAR
async function remove(id) {
  const res = await fetch(URL + '?id=' + id, { method: 'DELETE' })
  return await res.json() 
}

const ingresosService = {
  getIngresos,
  saveIngreso,
  remove // AGREGUE ESTE PARA ELIMINAR
};

export default ingresosService;