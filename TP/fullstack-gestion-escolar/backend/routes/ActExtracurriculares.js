import express from "express";
import { Actividad_Extracurricular } from "../models/ActExtracurriculares.js";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/actividadesExtracurriculares/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todas las actividades extracurriculares.
router.get("/actividadesExtracurriculares", async (req, res) => {
  try {
    const actividades = await Actividad_Extracurricular.findAll();
    if (actividades) {
      res.status(200).json(actividades);
    } else {
      res
        .status(404)
        .json({ mensaje: "No se encontraron actividades extracurriculares" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener una actividad extracurricular por id del profesor.
router.get("/actividadesExtracurriculares/:id", async (req, res) => {
  try {
    const actividad = await Actividad_Extracurricular.findOne({
      where: {
        Id_Profesor: req.params.id,
      },
    });
    if (actividad) {
      res.status(200).json(actividad);
    } else {
      res.status(404).json({
        mensaje:
          "No se encontró la actividad extracurricular asignada al profe con ese ID",
      });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear una nueva actividad.
router.post("/actividadesExtracurriculares", async (req, res) => {
  try {
    const existeActividad = await Actividad_Extracurricular.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Descripcion: req.body.Descripcion },
          { Fecha: req.body.Fecha },
          { Id_Profesor: req.body.Id_Profesor },
        ],
      },
    });
    if (existeActividad) {
      res.status(400).json({
        mensaje: "Ya existe una actividad extracurricular con esos datos.",
      });
    }
    const newAct = await Actividad_Extracurricular.create(req.body);
    if (newAct) {
      res.status(201).json(newAct);
    } else {
      res
        .status(400)
        .json({ mensaje: "No se pudo crear la actividad extracurricular." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Actualizar una actividad extracurricular segun el id indicado.
router.put("/actividadesExtracurriculares/:id", async (req, res) => {
  try {
    const actividad = await Actividad_Extracurricular.findByPk(req.params.id);
    if (actividad) {
      await actividad.update(req.body);
      res.status(200).json(actividad);
    } else {
      res.status(404).json({
        mensaje: "No se encontró la actividad extracurricular con ese ID",
      });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Eliminar una actividad extracurricular segun el id indicado.
router.delete("/actividadesExtracurriculares", async (req, res) => {
  try {
    const actividad = await Actividad_Extracurricular.findByPk(req.body.id);
    if (actividad) {
      await actividad.destroy();
      res.status(200).json({ mensaje: "Actividad extracurricular eliminada." });
    } else {
      res.status(404).json({
        mensaje: "No se encontró la actividad extracurricular con ese ID",
      });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
