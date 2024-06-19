import express from "express";
import { Asistencia } from "../models/Asistencia.js";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/asistencias/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todas las asistencias.
router.get("/asistencias", async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll();
    if (asistencias) {
      res.status(200).json(asistencias);
    } else {
      res.status(404).json({ mensaje: "No se encontraron asistencias" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Obtener asistencias por id del estudiante.
router.get("/asistencias/:id", async (req, res) => {
  try {
    const asistencia = await Asistencia.findOne({
      where: {
        Id_Estudiante: req.params.id,
      },
    });
    if (asistencia) {
      res.status(200).json(asistencia);
    } else {
      res.status(404).json({
        mensaje: "No se encontró la asistencia del estudiante con ese ID",
      });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Crear una nueva asistencia.
router.post("/asistencias", async (req, res) => {
  try {
    const existeAsistencia = await Asistencia.findOne({
      where: {
        [Op.and]: [
          { Fecha: req.body.Fecha },
          { Asistio: req.body.Asistio },
          { Id_Estudiante: req.body.Id_Estudiante },
          { Id_Horario: req.body.Id_Horario },
        ],
      },
    });
    if (existeAsistencia) {
      res.status(400).json({ mensaje: "La asistencia ya existe." });
    }
    const newAsistencia = await Asistencia.create(req.body);
    if (newAsistencia) {
      res.status(201).json(newAsistencia);
    } else {
      res.status(400).json({ mensaje: "Error al crear la asistencia." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Actualizar una asistencia por id de estudiante.
router.put("/asistencias/:id", async (req, res) => {
  try {
    const asistencia = await Asistencia.findOne({
      where: {
        Id_Estudiante: req.params.id,
      },
    });
    if (asistencia) {
      await asistencia.update(req.body);
      res.status(200).json(asistencia);
    } else {
      res
        .status(404)
        .json({ mensaje: "Asistencia del alumno con ese ID no encontrada." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor:", error });
  }
});

//Eliminar una asistencia por id de estudiante.
router.delete("/asistencias/:id", async (req, res) => {
  try {
    const eliminado = await Asistencia.findOne({
      where: {
        Id_Estudiante: req.params.id,
      },
    });
    if (eliminado) {
      await eliminado.destroy();
      res.status(200).json({ mensaje: "Asistencia del alumno eliminada." });
    } else {
      res
        .status(404)
        .json({ mensaje: "Asistencia del alumno con ese ID no encontrada." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
