// src/services/obra.services.js

const API_BASE_URL = 'http://localhost:3001/api/obras-teatrales'; // Cambia la URL base según tu configuración de backend

const obraServices = {
    saveObraTeatral: async (data) => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error al guardar la obra: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error guardando la obra:', error);
            throw error;
        }
    },

    getObrasTeatrales: async () => {
        try {
            const response = await fetch(API_BASE_URL);

            if (!response.ok) {
                throw new Error(`Error al obtener las obras: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error obteniendo las obras:', error);
            throw error;
        }
    }
};

export default obraServices;
