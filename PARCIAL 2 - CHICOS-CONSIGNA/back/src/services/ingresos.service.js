
import sequelize from "../models/database.js"

const getAll = async () => {
    const resultado = await sequelize.models.Ingresos.findAll({
        order: [['HoraIngreso', 'ASC']]
    })
    return resultado.map(p => {
        return {
            Id: p.dataValues.Id,
            Dni: p.dataValues.Dni,
            HoraIngreso: p.dataValues.HoraIngreso,
            Proveedor: p.dataValues.Proveedor,
            ConNotebook: p.dataValues.ConNotebook,
        }
    })
}

const create = async (ingreso) => {
    const resultado = await sequelize.models
    .Ingresos.create({
        Dni: ingreso.Dni,
        HoraIngreso: ingreso.HoraIngreso,
        Proveedor: ingreso.Proveedor,
        ConNotebook: ingreso.ConNotebook
    })
    
    return {
        Id: resultado.dataValues.Id,
    };

}

export default  {
    getAll,
    create,
}