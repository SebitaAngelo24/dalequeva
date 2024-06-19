import { DataTypes } from "sequelize";

const ReservaAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El DNI del responsable de reserva es necesario"
            }
        }
    },
    FechaIngreso: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La fecha de ingreso es necesaria"
            }
        }
    },
    FechaSalida: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    TipoEstadia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El tipo de estadía  es es necesario"
            }
        }
    },
    Huespedes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La duracion de la pelicula es necesaria"
            }
        }
    }
}

const ReservaOptions = {
    timestamps: false
}

export default {
    ReservaAttributes,
    ReservaOptions
}
