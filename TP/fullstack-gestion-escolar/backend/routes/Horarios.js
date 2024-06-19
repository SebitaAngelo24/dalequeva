import { Horario } from "../models/Horario.js";
import express from "express";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/horarios/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los horarios
router.get("/horarios", async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener Horarios por id de asignatura
router.get("/horarios/:id", async (req, res) => {
  try {
    const materia = req.params.asign;
    const lst = await Horario.findOne({
      where: {
        Asignatura_Id: materia,
      },
    });
    if (lst) {
      res.status(200).json(lst);
    } else {
      res.status(404).json({
        mensaje: "No se encontraron horarios para la asignatura indicada.",
      });
    }
  } catch (error) {
    console.error("Error obteniendo horarios:", error);
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Crear un nuevo horario
router.post("/horarios", async (req, res) => {
  try {
    const existeHorario = await Horario.findOne({
      where: {
        [Op.and]: [
          { Dia: req.body.Dia },
          { Hora_Inicio: req.body.Hora_Inicio },
          { Hora_Fin: req.body.Hora_Fin },
          { Aula: req.body.Aula },
          { Asignatura_Id: req.body.Asignatura_Id },
          { Curso_Id: req.body.Curso_Id },
          { Profesor_Id: req.body.Profesor_Id },
        ],
      },
    });
    if (existeHorario) {
      res.status(400).json({ mensaje: "El horario ya existe" });
    }
    const nuevoHorario = await Horario.create({
      Dia: req.body.Dia,
      Hora_Inicio: req.body.Hora_Inicio,
      Hora_Fin: req.body.Hora_Fin,
      Aula: req.body.Aula,
      Asignatura_Id: req.body.Asignatura_Id,
      Curso_Id: req.body.Curso_Id,
      Profesor_Id: req.body.Profesor_Id,
    });
    if (nuevoHorario) {
      res.status(201).json(nuevoHorario);
    } else {
      res.status(404).json({ message: "No se pudo crear el nuevo horario." });
    }
  } catch {
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

//Actualizar un horario por id
router.put("/horarios/:id", async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (horario) {
      await horario.update(req.body);
      res.status(200).json(horario);
    } else {
      res.status(404).json({ message: "Horario no encontrado." });
    }
  } catch {
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});
//Borrar un horario por id
router.delete("/horarios/:id", async (req, res) => {
  try {
    const eliminado = await Horario.findByPk(req.params.id);
    if (eliminado) {
      await eliminado.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Horario no encontrado" });
    }
  } catch {
    res.status(500).json({ error: "Error del servidor: ", error });
  }
});

export default router;
