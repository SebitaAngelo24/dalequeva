import { Calificacion } from "../models/Calificacion.js";
import express from "express";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/calificaciones/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todas las calificaciones de todos los estudiantes
router.get("/calificaciones", async (req, res) => {
  try {
    res.status(200).json(await Calificacion.findAll());
  } catch (error) {
    res.status(404).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener calificaciones por id de estudiante
router.get("/calificaciones/:idAlumno", async (req, res) => {
  try {
    const calificacionAlumn = await Calificacion.findOne({
      where: {
        Estudiante_Id: req.params.idAlumno,
      },
    });
    if (calificacionAlumn) {
      res.status(200).json(calificacionAlumn);
    } else {
      res.status(404).json({
        message: "Calificacion no encontrada para el alumno indicado",
      });
    }
  } catch {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});
//Crear una nueva calificacion
router.post("/calificaciones", async (req, res) => {
  try {
    // Verificar si existe la calificacion
    const existeCalificacion = await Calificacion.findOne({
      where: {
        [Op.and]: [
          { Estudiante_Id: req.body.Estudiante_Id },
          { Asignatura_Id: req.body.Asignatura_Id },
          { Nota: req.body.Nota },
          { Fecha: req.body.Fecha },
        ],
      },
    });
    // Si existe la calificacion, se envia un mensaje de error
    if (existeCalificacion) {
      res.status(400).json({ mensaje: "La calificacion ya existe" });
    }
    // Si no existe la calificacion, se crea una nueva
    const nuevaCalificacion = Calificacion.create({
      Estudiante_Id: req.body.Estudiante_Id,
      Asignatura_Id: req.body.Asignatura_Id,
      Nota: req.body.Nota,
      Fecha: req.body.Fecha,
    });
    if (nuevaCalificacion) {
      res.status(201).json(nuevaCalificacion);
    } else {
      res
        .status(404)
        .json({ message: "No se pudo cargar la nueva calificacion" });
    }
  } catch {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});
//Actualizar una calificacion por id
router.put("/calificaciones/:id", async (req, res) => {
  try {
    const calificacion = await Calificacion.findByPk(req.params.id);
    if (calificacion) {
      await calificacion.update(req.body);
      res.status(200).json(calificacion);
    } else {
      res.status(404).json({ message: "Calificacion no encontrada" });
    }
  } catch {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});
//Borrar una calificacion por id
router.delete("/calificaciones/:id", async (req, res) => {
  try {
    const eliminado = await Calificacion.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (eliminado) {
      await eliminado.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Calificación no encontrada" });
    }
  } catch (error) {
    console.error("Error eliminando calificación:", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
