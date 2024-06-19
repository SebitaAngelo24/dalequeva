import { DataTypes } from "sequelize";

const SalaAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre de la sala es requerido"
            }
        }
    }
}

const SalaOptions = {
    timestamps: false
}

const SalaModel = {
    SalaAttributes,
    SalaOptions
}

export default SalaModel
