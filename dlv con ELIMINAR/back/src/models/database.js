import Sequelize from "sequelize";
import IngresoModel from "./ingresos.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './ingresos.db'
})

sequelize.define(
    'Ingresos',
    IngresoModel.IngresoAttributes,
    IngresoModel.IngresoOptions
)

try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
