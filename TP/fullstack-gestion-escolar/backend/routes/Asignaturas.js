import { Asignatura } from "../models/asignatura.js";
import express from "express";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/asignaturas/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todas las asignaturas
router.get("/asignaturas", async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll();
    res.status(200).json(asignaturas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Obtener asignaturas por id
router.get("/asignaturas/:id", async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id);
    if (asignatura) {
      res.status(200).json(asignatura);
    } else {
      res.status(404).json({ mensaje: "Asignatura no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Crear una nueva asignatura
router.post("/asignaturas", async (req, res) => {
  try {
    //Verificar si existe la asignatura
    const existeAsignatura = await Asignatura.findOne({
      where: {
        [Op.and]: [
          { Nombre: req.body.Nombre },
          { Descripcion: req.body.Descripcion },
        ],
      },
    });
    //Si existe la asignatura, se envía un mensaje de error
    if (existeAsignatura) {
      res.status(400).json({ mensaje: "La asignatura ya existe" });
    }
    //Si no existe la asignatura, se crea una nueva
    const nuevaAsignatura = Asignatura.create({
      Nombre: req.body.Nombre,
      Descripcion: req.body.Descripcion,
    });
    if (nuevaAsignatura) {
      res.status(201).json(asignatura);
    } else {
      res.status(400).json({ mensaje: "Error al crear la asignatura" });
    }
  } catch (error) {
    console.error("Error en la petición POST de asignaturas", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Actualizar una asignatura por id
router.put("/asignaturas/:id", async (req, res) => {
  try {
    const asignatura = await Asignatura.findOne({
      where: {
        Id_Asignatura: req.params.id,
      },
    });
    if (asignatura) {
      await asignatura.update(req.body);
      res.status(200).json(asignatura);
    } else {
      res.status(404).json({ message: "Asignatura no encontrada" });
    }
  } catch (error) {
    console.error("Error en la petición PUT de asignaturas", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

//Eliminar una asignatura por id
router.delete("/asignaturas/:id", async (req, res) => {
  try {
    const asignatura = await Asignatura.findOne({
      where: {
        Id_Asignatura: req.params.id,
      },
    });
    if (asignatura) {
      await asignatura.destroy();
      res.status(200).json(asignatura);
    } else {
      res.status(404).json({ mensaje: "Asignatura no encontrada" });
    }
  } catch (error) {
    console.error("Error en la petición DELETE de asignaturas", error);
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
