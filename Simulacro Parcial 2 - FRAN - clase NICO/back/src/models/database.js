import Sequelize from "sequelize";
import ReservaModel from "./reserva.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './reservas.db'
})

sequelize.define(
    'Reservas',
    ReservaModel.ReservaAttributes,
    ReservaModel.ReservaOptions
)

try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
