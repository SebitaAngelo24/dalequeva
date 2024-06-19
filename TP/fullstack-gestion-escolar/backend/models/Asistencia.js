import { sequelize } from "../data/sequelize-init.js";
import { DataTypes } from "sequelize";

//Registra la asistencia de los estudiantes.
export const Asistencia = sequelize.define(
  "Asistencia",
  {
    Id_Asistencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    Asistio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Id_Estudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Estudiantes",
        key: "Id_Estudiante",
      },
    },
    Id_Horario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Horarios",
        key: "Id_Horario",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Asistencias",
    modelName: "Asistencia",
  }
);
