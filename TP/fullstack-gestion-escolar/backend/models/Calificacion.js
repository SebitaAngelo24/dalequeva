import { DataTypes } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";

//Almacena las calificaciones de los estudiantes.
export const Calificacion = sequelize.define(
  "Calificacion",
  {
    Id_Calificacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Estudiante_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Estudiantes",
        key: "Id_Estudiante",
      },
    },
    Asignatura_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Asignaturas",
        key: "Id_Asignatura",
      },
    },
    Nota: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 1, // Valor minimo de la calificacion
        max: 10, // Valor maximo de la calificacion
      },
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "Por favor ingrese una fecha valida",
        },
      },
    },
  },
  {
    timestamps: false,
    modelName: "Calificacion",
    tableName: "Calificaciones",
  }
);
