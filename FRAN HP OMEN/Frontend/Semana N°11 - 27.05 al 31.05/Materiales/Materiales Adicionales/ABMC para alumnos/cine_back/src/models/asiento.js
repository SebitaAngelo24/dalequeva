import { DataTypes } from "sequelize";

const AsientoAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El numero de asiento es requerido"
            }
        }
    },
    IdSala: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El id de la sala es requerido"
            }
        }
    }
}

const AsientoOptions = {
    timestamps: false
}

const AsientoModel = {
    AsientoAttributes,
    AsientoOptions
}

export default AsientoModel
