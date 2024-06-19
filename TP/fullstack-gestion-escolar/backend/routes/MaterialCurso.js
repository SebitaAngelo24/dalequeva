import express from "express";
import { Material_Curso } from "../models/Material_Curso.js";
import { Op } from "sequelize";
const router = express.Router();

// Middleware para validar que el id sea un número entero
router.use("/materiales/:id", (req, res, next) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    // Valida que el id sea un número entero.
    return res.status(400).json({ mensaje: "El formato del id es invalido" });
  }
  next();
});

//Obtener todos los materiales de los cursos
router.get("/materiales", async (req, res) => {
  try {
    const materiales = await Material_Curso.findAll();
    if (materiales) {
      res.status(200).json(materiales);
    } else {
      res.status(404).json({ message: "No se encontraron materiales." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Obtener un material por Id del curso.
router.get("/materiales/:id", async (req, res) => {
  try {
    const material = await Material_Curso.findOne({
      where: {
        Id_Curso: req.params.id,
      },
    });
    if (material) {
      res.status(200).json(material);
    } else {
      res
        .status(404)
        .json({ message: "No se encontró el material del curso indicado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Crear un nuevo material.
router.post("/materiales", async (req, res) => {
  try {
    const existeMaterial = await Material_Curso.findOne({
      where: {
        [Op.and]: [
          { Descripcion: req.body.Descripcion },
          { Tipo_Material: req.body.Tipo_Material },
          { URL: req.body.URL },
          { Id_Curso: req.body.Id_Curso },
        ],
      },
    });
    if (existeMaterial) {
      res.status(400).json({ message: "El material ya existe." });
    }
    const newMaterial = await Material_Curso.create(req.body);
    if (newMaterial) {
      res.status(201).json(newMaterial);
    } else {
      res.status(400).json({ message: "No se pudo crear el material." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Actualizar un material segun su id.
router.put("/materiales/:id", async (req, res) => {
  try {
    const material = await Material_Curso.findByPk(req.params.id);
    if (material) {
      await material.update(req.body);
      res.status(201).json(material);
    } else {
      res.status(404).json({ message: "No se encontró el material." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: ", error });
  }
});

//Eliminar material segun su id.
router.delete("/materiales/:id", async (req, res) => {
  try {
    const material = await Material_Curso.findByPk(req.params.id);
    if (material) {
      await material.destroy();
      res.status(200).json({ message: "Material eliminado." });
    } else {
      res.status(404).json({ message: "No se encontró el material." });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor: ", error });
  }
});

export default router;
