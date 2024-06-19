import { DataTypes } from "sequelize";

const FilaAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Codigo: {
        type: DataTypes.STRING(1),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El codigo de la fila es requerido"
            }
        }
    },
    IdSala: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El id la sala es requerido"
            }
        }
    }
}

const FilaOptions = {
    timestamps: false
}

const FilaModel = {
    FilaAttributes,
    FilaOptions
}

export default FilaModel
