const API_URL = 'http://localhost:3001/ingresos'; // Suponiendo que tu API está en este URL

const IngresoService = {
  async registrarIngreso(ingresoData) {
    try {
      const response = await fetch(`${API_URL}/ingresos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingresoData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el ingreso');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async obtenerIngresos() {
    try {
      const response = await fetch(`${API_URL}/ingresos`);

      if (!response.ok) {
        throw new Error('Error al obtener los ingresos');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default IngresoService;
