import Sequelize from "sequelize";
import SalaModel from "./sala.js";
import FilaModel from "./fila.js";
import AsientoModel from "./asiento.js";
import FuncionModel from "./funcion.js";
import PeliculaModel from "./pelicula.js";
import ClasificacionModel from "./clasificacion.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './cine-extendido.db'
})

sequelize.define(
    'Salas',
    SalaModel.FuncionAttributes,
    SalaModel.FuncionOptions
)

sequelize.define(
    'Filas',
    FilaModel.FuncionAttributes,
    FilaModel.FuncionOptions
)

sequelize.define(
    'Asientos',
    AsientoModel.FuncionAttributes,
    AsientoModel.FuncionOptions
)

sequelize.define(
    'Funciones',
    FuncionModel.FuncionAttributes,
    FuncionModel.FuncionOptions
)

sequelize.define(
    'Peliculas',
    PeliculaModel.PeliculaAttributes,
    PeliculaModel.PeliculaOptions
)

sequelize.define(
    'Clasificaciones',
    ClasificacionModel.ClasificacionAttributes,
    ClasificacionModel.ClasificacionOptions
)

sequelize.models.Asientos.belongsTo(sequelize.models.Filas, {
    foreignKey: 'IdFila'
})

sequelize.models.Filas.belongsTo(sequelize.models.Salas, {
    foreignKey: 'IdSala'
})

sequelize.models.Funciones.belongsTo(sequelize.models.Salas, {
    foreignKey: 'IdSala'
})

sequelize.models.Funciones.belongsTo(sequelize.models.Peliculas,{
    foreignKey: 'IdPelicula'
})

sequelize.models.Peliculas.belongsTo(sequelize.models.Clasificaciones, {
    foreignKey: 'IdClasificacion'
})


try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
