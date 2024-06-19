import { DataTypes } from "sequelize";

const FuncionAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    IdPelicula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El id de pelicula es requerido"
            }
        }
    },
    Fecha: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La fecha es requerida"
            }
        }
    },
    HoraInicio: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La hora de inicio es requerida"
            }
        }
    },
    HoraFin: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La hora de fin es requerida"
            }
        }
    },
    IdSala: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La sala es requerida"
            }
        }
    },
    Eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El estado eliminado es requerido.'
            }
        }
    }
}

const FuncionOptions = {
    timestamps: false
}

const FuncionModel = {
    FuncionAttributes,
    FuncionOptions
}

export default FuncionModel
