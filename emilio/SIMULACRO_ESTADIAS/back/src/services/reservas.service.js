
import sequelize from "../models/database.js"

const getAll = async () => {
    const resultado = await sequelize.models.Reservas.findAll({
        attributes: [
            'Dni',
            'FechaIngreso',
            'FechaSalida',
            'TipoEstadia',
            'Huespedes'
        ],
        order: [['FechaIngreso', 'ASC']]
    })
    return resultado.map(p => {
        return {
            id: p.dataValues.Id,
            Dni: p.dataValues.Dni,
            FechaIngreso: p.dataValues.FechaIngreso,
            FechaSalida: p.dataValues.FechaSalida,
            TipoEstadia: p.dataValues.TipoEstadia,
            Huespedes: p.dataValues.Huespedes
        }
    })
}

const create = async (reserva) => {
    const resultado = await sequelize.models
    .Reservas.create({
        Dni: reserva.Dni,
        FechaIngreso: reserva.FechaIngreso,
        FechaSalida: reserva.FechaSalida,
        TipoEstadia: reserva.TipoEstadia,
        Huespedes: reserva.Huespedes
    })
    
    return {
        Id: resultado.dataValues.Id,
    };

}

export default  {
    getAll,
    create,
}