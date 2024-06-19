import { Profesores } from "../models/Profesores.js";
import express from "express";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/profesores/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los profesores
router.get("/profesores", async (req, res) => {
  try {
    const profesores = await Profesores.findAll();
    res.status(200).json(profesores);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Obtener profesor por id
router.get("/profesores/:id", async (req, res) => {
  try {
    const profe = await Profesores.findByPk(req.params.id);
    if (profe) {
      res.status(200).json(profe);
    } else {
      res.status(404).json({ mensaje: "Profesor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ Error: "Error del servidor: ", error });
  }
});

//Crear un nuevo profesor
router.post("/profesores", async (req, res) => {
  try {
    const fechaNacimiento = new Date(req.body.Fecha_Nacimiento);
    const existeProfesor = await Profesores.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Apellido: req.body.Apellido },
          { Fecha_Nacimiento: fechaNacimiento },
          { Especialidad: req.body.Especialidad },
          { Telefono: req.body.Telefono },
          { Email: req.body.Email },
        ],
      },
    });
    if (existeProfesor) {
      res.status(400).json({ mensaje: "El profesor ya existe" });
    }
    const nuevoProfesor = await Profesores.create(req.body);
    if (nuevoProfesor) {
      res.status(201).json(nuevoProfesor);
    } else {
      res.status(400).json({ mensaje: "Error al crear el profesor" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Actualizar un profesor por id
router.put("/profesores/:id", async (req, res) => {
  try {
    const profe = await Profesores.findByPk(req.params.id);
    if (profe) {
      await profe.update(req.body);
      res.status(200).json(profe);
    } else {
      res.status(404).json({ mensaje: "Profesor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Borrar un profesor por id
router.delete("/profesores/:id", async (req, res) => {
  try {
    const eliminado = await Profesores.findByPk(req.params.id);
    if (eliminado) {
      await eliminado.destroy();
      res.status(200).json({ mensaje: "Profesor eliminado" });
    } else {
      res.status(404).json({ mensaje: "Profesor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

export default router;
