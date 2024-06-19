import express from "express";
import { Matricula } from "../models/Matriculas.js";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/matriculas/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todas las matriculas
router.get("/matriculas", async (req, res) => {
  try {
    const matriculas = await Matricula.findAll();
    if (matriculas) {
      res.status(200).json(matriculas);
    } else {
      res.status(404).json({ message: "No se encontraron matriculas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Obtener una matricula por Id del estudiante.
router.get("/matriculas/:id", async (req, res) => {
  try {
    const matricula = await Matricula.findOne({
      where: {
        Id_Estudiante: req.params.id,
      },
    });
    if (matricula) {
      res.status(200).json(matricula);
    } else {
      res.status(404).json({
        message: "No se encontró la matricula del estudiante indicado.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Crear una nueva matricula.
router.post("/matriculas", async (req, res) => {
  try {
    const existeMatricula = await Matricula.findOne({
      where: {
        [Op.and]: [
          { Fecha_Matricula: req.body.Fecha_Matricula },
          { Id_Estudiante: req.body.Id_Estudiante },
          { Id_Curso: req.body.Id_Curso },
        ],
      },
    });
    if (existeMatricula) {
      res.status(400).json({ message: "La matricula ya existe" });
    }
    const newMatricula = await Matricula.create(req.body);
    if (newMatricula) {
      res.status(200).json(newMatricula);
    } else {
      res.status(400).json({ message: "No se pudo crear la matricula" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Actualizar una matricula segun su id.
router.put("/matriculas/:id", async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    if (matricula) {
      await matricula.update(req.body);
      res.status(201).json(matricula);
    } else {
      res.status(404).json({ message: "La matricula no existe" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Eliminar una matricula segun su id.
router.get("/matriculas/:id", async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    if (matricula) {
      await matricula.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "La matricula no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

export default router;
