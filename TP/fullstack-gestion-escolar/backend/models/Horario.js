import { DataTypes } from "sequelize";
import { sequelize } from "../data/sequelize-init.js";

//Define el horario de clases. 
export const Horario = sequelize.define(
  "Horarios",
  {
    Id_Horario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Dia: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Dia no puede ser nulo",
        },
        len: {
          args: [5, 15],
          msg: "El campo Dia debe tener entre 1 y 15 caracteres",
        },
      },
    },
    Hora_Inicio: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Hora de Inicio no puede ser nula",
        },
        // Nos sirve para validar que la hora de inicio sea correcta con el formato HH:MM
        is: /^([01]\d|2[0-3]):?([0-5]\d)$/,
        // Esta funcion se encarga de validar que la hora de inicio sea correcta con el formato HH:MM, de ser lo contrario mostraria un mensaque de error.
        isCorrectFormat(value) {
          if (!/^([01]\d|2[0-3]):?([0-5]\d)$/.test(value)) {
            throw new Error("El formato de la hora debe ser HH:MM");
          }
        },
      },
    },
    Hora_Fin: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Hora de Inicio no puede ser nula",
        },
        // Esta expresion regular nos sirve para validar que la hora de inicio sea correcta con el formato HH:MM
        is: /^([01]\d|2[0-3]):?([0-5]\d)$/,
        // Esta funcion se encarga de validar que la hora de inicio sea correcta con el formato HH:MM, de ser lo contrario mostraria un mensaque de error.
        isCorrectFormat(value) {
          if (!/^([01]\d|2[0-3]):?([0-5]\d)$/.test(value)) {
            throw new Error("El formato de la hora debe ser HH:MM");
          }
        },
        // Esta funcion nos ayuda a determinar que la hora de fin sea mayor a la hora de inicio
        isAfterHoraInicio(value) {
          if (this.Horiario_Inicio && value <= this.Horiario_Inicio) {
            throw new Error(
              "La hora de fin debe ser mayor a la hora de inicio"
            );
          }
        },
      },
    },
    Aula: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo Aula no puede estar vacio",
        },
        len: {
          args: [1, 10],
          msg: "El campo Aula debe tener entre 1 y 10 caracteres",
        },
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
    Curso_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cursos",
        key: "Id_Curso",
      },
    },
    Profesor_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Profesores",
        key: "Id_Profesor",
      },
    },
  },
  {
    timestamps: false,
    modelName: "Horarios",
    tableName: "Horarios",
  }
);
