import { Curso } from "../models/curso.js";
import express from "express";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/cursos/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los cursos
router.get("/cursos", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener cursos por id
router.get("/cursos/:id", async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ mensaje: "Curso no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear un nuevo curso
router.post("/cursos", async (req, res) => {
  try {
    //Verificar si existe el curso
    const existeCurso = await Curso.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Descripcion: req.body.Descripcion },
          { Fecha_Inicio: req.body.Fecha_Inicio },
          { Fecha_Fin: req.body.Fecha_Fin },
        ],
      },
    });
    //Si existe el curso, se envía un mensaje de error
    if (existeCurso) {
      res.status(400).json({ mensaje: "El curso ya existe" });
    }
    //Si no existe el curso, se crea uno nuevo
    const curso = await Curso.create(req.body);
    if (curso) {
      res.status(201).json(curso);
    } else {
      res.status(400).json({ mensaje: "No se pudo crear el curso" });
    }
  } catch (error) {
    console.error("Error en la petición POST de cursos", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Actualizar un curso por id
router.put("/cursos/:id", async (req, res) => {
  try {
    const curso = await Curso.findOne({
      where: {
        Id_Curso: req.params.id,
      },
    });
    if (curso) {
      await curso.update(req.body);
      res.status(200).json(curso);
    } else {
      res.status(404).json({ mensaje: "Curso no encontrado" });
    }
  } catch (error) {
    console.error("Error en la petición PUT de cursos", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Borrar un curso por id
router.delete("/cursos/:id", async (req, res) => {
  try {
    const eliminado = await Curso.findOne({
      where: {
        Id_Curso: req.params.id,
      },
    });
    if (eliminado) {
      await eliminado.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ mensaje: "Curso no encontrado" });
    }
  } catch (error) {
    console.error("Error en la petición DELETE de cursos", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
