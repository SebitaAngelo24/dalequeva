import { DataTypes } from "sequelize";

const IngresoAttributes = {
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
                msg: "El DNI del ingresante es necesario"
            }
        }
    },
    HoraIngreso: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La hora de ingreso es necesaria"
            }
        }
    },
    Proveedor: {
        type: DataTypes.STRING
    },
    ConNotebook: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El chequeo de ingreso con notebook es necesario"
            }
        }
    }
}

const IngresoOptions = {
    timestamps: false
}

export default {
    IngresoAttributes,
    IngresoOptions
}
