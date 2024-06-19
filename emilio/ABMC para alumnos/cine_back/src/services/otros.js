import { Op, ValidationError } from "sequelize";
import sequelize from "./src/models/database.js";

// =====REUTLIZABLES=======
const getPeliculaPorId = async (idPelicula) => {
    const resultado = await sequelize.models.Peliculas.findOne({
        attributes: [
            'Id',
            'Titulo',
            'Director',
            'Genero',
            'Sinopsis',
            'Duracion',
            'Eliminado',
        ],
        where: { Id: idPelicula }
    })
    // console.log('getPeliculaPorId', resultado.dataValues)
    return resultado.dataValues
}

// ====================PUNTO 1====================

const getPeliculas = async () => {
    const resultado = sequelize.models.Peliculas.findAndCountAll({
        attributes: [
            'Id',
            'Titulo',
            'Director',
            'Genero',
            'Sinopsis',
            'Duracion',
            'Eliminado',
            'IdClasificacion'
        ],
        order: [['Titulo', 'ASC']]
    })
    if (!resultado || !resultado.rows)
        return [];
    return resultado.rows.map(pelicula => pelicula.dataValues);
}


// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
// console.log("1. Mostrar los datos de todas las peliculas, getPeliculas():")
// const peliculas = await getPeliculas()
// console.log(peliculas)


// ====================PUNTO 2====================
const getPeliculasPorIdClasificacion = async (idClasificacion) => {
    const resultado = sequelize.models.Peliculas.findAll({
        attributes: [
            'Titulo',
            'Genero',
            'Sinopsis',
            'Duracion',
            'Director'
        ],
        where: { IdClasificacion: idClasificacion }
    })
    return resultado.map(pelicula => {
        return {
            titulo: pelicula.Titulo,
            genero: pelicula.Genero,
            sinopsis: pelicula.Sinopsis,
            duracion: pelicula.Duracion,
            director: pelicula.Director
        }
    })
}


// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
// console.log("2. Mostrar los datos de las peliculas con IdClasificacion igual al pasado por parametro, getPeluclasPorIdClasificacion(idClasificacion):")
// const peliculasPorIdClasificacion = await getPeliculasPorIdClasificacion(2)
// console.log(peliculasPorIdClasificacion)


// ====================PUNTO 3====================

const getPeliculaMasPopular = async () => {
    const resultado = await sequelize.models.Funciones.findAll({
        attributes: [
            'IdPelicula',
            'Genero',
            'Sinopsis',
            'Duracion',
            'Director'
        ],
        group: [
            'IdPelicula'
        ],
        attributes: [
            'IdPelicula',
            [sequelize.fn('COUNT', 'IdPelicula'), 'TotalFunciones']
        ],
        order: [['TotalFunciones', 'DESC']],
        include: {
            model: sequelize.models.Peliculas,
            where: { Eliminado: false }
        }
    });
    const pelicula = resultado[0].dataValues.Pelicula.dataValues;
    return {
        titulo: pelicula.Titulo,
        genero: pelicula.Genero,
        sinopsis: pelicula.Sinopsis,
        duracion: pelicula.Duracion,
        director: pelicula.Director
    }
}


// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
// console.log("3. Mostrar los datos de la pelicula mas popular, getPeliculaMasPopular()")
// const peliculaMasPopular = await getPeliculaMasPopular()
// console.log(peliculaMasPopular)


// ====================PUNTO 4====================

const getFinFuncion = async (datos) => {
    const pelicula = await getPeliculaPorId(datos.idPelicula)
    // console.log('pelicula', pelicula)
    let fechaHoraInicio = new Date();
    fechaHoraInicio.setHours(parseInt(datos.horaInicio.split(":")[0]));
    fechaHoraInicio.setMinutes(parseInt(datos.horaInicio.split(":")[1]));

    // Agregar la duración a la fecha de inicio
    fechaHoraInicio.setMinutes(fechaHoraInicio.getMinutes() + pelicula.Duracion);

    // Convertir la fecha de resultado a un string de hora
    let horaFinal = fechaHoraInicio.getHours().toString().padStart(2, "0") + ":" + fechaHoraInicio.getMinutes().toString().padStart(2, "0");

    return {
        titulo: pelicula.Titulo,
        duracion: pelicula.Duracion,
        horaFinalizacion: horaFinal,
        horaInicio: datos.horaInicio
    }
}

// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
// console.log("4. Muestra el fin de la funcion")
// let finFuncion = await getFinFuncion(
//     {
//         fecha: new Date(),
//         horaInicio: "20:48",
//         sala: 1,
//         idPelicula: 3
//     }
// )
// console.log(finFuncion)


// ====================PUNTO 5====================
const getGeneros = async () => {
    const peliculas = await sequelize.models.Peliculas.findAll({
        attributes: [
            'Genero'
        ]
    })
    // console.log('peliculas get generos', peliculas)
    const generos = peliculas.map(p => p.dataValues.Genero)
    const generosSinDuplicados = []
    for (const genero of generos) {
        if (!!genero && !generosSinDuplicados.some(g => g === genero)) {
            generosSinDuplicados.push(genero)
        }
    }
    return generosSinDuplicados
}


// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
// console.log("5. Listar todos los géneros sin duplicados ordenadas de mayor a menor")
// const generos = await getGeneros()
// console.log(generos)


// ====================PUNTO 6====================

const insertarFuncion = async (funcion) => {
    try {
        const resultado = await sequelize.models.Funciones.create({
            IdPelicula: funcion.idPelicula,
            Fecha: funcion.fecha,
            HoraInicio: funcion.horaInicio,
            HoraFin: funcion.horaFin,
            IdSala: funcion.idSala
        })
        return {
            idPelicula: resultado.dataValues.IdPelicula,
            fecha: resultado.dataValues.Fecha,
            horaInicio: resultado.dataValues.HoraInicio,
            horaFin: resultado.dataValues.HoraFin,
            idSala: resultado.dataValues.IdSala
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return { message: err.message }
        }
        else {
            throw err
        }
    }
}


// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
// console.log("6. Insertar una nueva funcion")
// let resultado = await insertarFuncion(
//     {
//         idPelicula: 4,
//         fecha: "2023-05-01",
//         horaInicio: "10:25",
//         horaFin: "12:25",
//         idSala: 2
//     }
// )
// console.log(resultado)


// ====================PUNTO 7====================

const getPeliculasByFecha = async (fecha) => {
    const resultado = await sequelize.models.Funciones.findAll({
        atributes: [
            'IdPelicula',
        ],
        group: ['IdPelicula'],
        where: { Fecha: fecha, Eliminado: false },
        include: {
            model: sequelize.models.Peliculas,
            attributes: [
                'Id',
                'Titulo',
                'Director',
                'Genero',
                'Sinopsis',
                'Duracion',
                'Eliminado'
            ]
        }
    })
    //console.log(resultado.length, resultado)
    return resultado.map(funcion => funcion.dataValues.Pelicula.dataValues)
}


// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
// let resultado = await getPeliculasByFecha("2023-05-09")
// console.log(resultado)


// ====================PUNTO 8====================
const getMaxTicketsAvender = async (datos) => {
    const pelicula = await getPeliculaPorId(datos.idPelicula);
    const fecha = new Date(datos.fecha);
    const salas = await sequelize.models.Salas.findAll({
        attributes: [
            'Id'
        ],
        includes: [
            {
                model: sequelize.models.Funciones,
                where: {
                    IdPelicula: datos.idPelicula,
                    Fecha: fecha
                }
            }
        ]
    });
    console.log('salas', salas)
    const idsSalas = salas.map(s=>s.dataValues.Id);
    console.log('idsSalas', idsSalas)
    const asientos = await sequelize.models.Asientos.findAndCountAll({
        attributes: [
            'Id',
            'IdFila'
        ],
        include: [
            {
                model: sequelize.models.Filas,
                attributes: [
                    'Id',
                    'IdSala'
                ],
                where: {
                    IdSala: {[Op.in]: idsSalas}
                }
            }
        ]
    });
    return {
        titulo: pelicula.Titulo,
        fecha: datos.fecha,
        capacidadTickets: asientos.rows.length
    }
}

// ------------------------Descomentar las siguientes lineas para probar el punto------------------------
let resultado = await getMaxTicketsAvender({
    idPelicula: 4,
    fecha: "2023-05-07"
})
console.log(resultado)

