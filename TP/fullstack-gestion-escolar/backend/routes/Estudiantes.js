import express from "express";
import { Op } from "sequelize";
import { Estudiante } from "../models/estudiantes.js";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/estudiantes/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los estudiantes
router.get("/estudiantes", async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener estuadiante por id
router.get("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      res.status(200).json(estudiante);
    } else {
      res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear un nuevo estudiante
router.post("/estudiantes", async (req, res) => {
  try {
    const existeEstudiante = await Estudiante.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Apellido: req.body.Apellido },
          { Fecha_nacimiento: req.body.Fecha_nacimiento },
          { Direccion: req.body.Direccion },
          { Telefono: req.body.Telefono },
          { Email: req.body.Email },
        ],
      },
    });
    if (existeEstudiante) {
      res.status(400).json({ mensaje: "El estudiante ya existe" });
    }
    const estudiante = await Estudiante.create(req.body);
    if (estudiante) {
      res.status(201).json(estudiante);
    } else {
      res.status(400).json({ mensaje: "No se pudo crear el estudiante" });
    }
  } catch (error) {
    console.error("Error en la petición POST de estudiantes", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});
//Actualizar un estudiante por id
router.put("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      const estudianteAct = await estudiante.update(req.body);
      res.status(200).json(estudianteAct);
    } else {
      res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});
//Eliminar un estudiante por id
router.delete("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      await estudiante.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
