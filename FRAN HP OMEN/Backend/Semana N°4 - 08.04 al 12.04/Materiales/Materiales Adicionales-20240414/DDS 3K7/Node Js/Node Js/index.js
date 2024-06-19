function init(hora){
    console.log(`Primer JS con Node.js a las ${hora}`)
}
//init('17.15 pm')
/**
 * Devuelve una cadena con la hora en formato 12 a partir de hora y minutos recibidos
 * @param {int} hh 
 * @param {int} mm 
 */
function convertirHora(hora, minutos) {
    let salida = ''

    if (hora === 0)
        salida = `${(hora + 12)}:${minutos} AM`
    else
        if (hora > 0 && hora < 12)
            salida = `${hora}:${minutos} AM`
        else
            if(hora === 12)
                salida = `${(hora)}: ${minutos} PM'`
            else
                salida = `${(hora - 12)}: ${minutos} PM'`

    return salida
}

console.log(convertirHora(0, 15))
console.log(convertirHora(10, 30))
console.log(convertirHora(18, 25))

/** MODIFICAR EL SCRIPT ANTERIOR PARA RECIBIR COMO PARÁMETRO LA FUNCION **convertirHora** 
 * y poder invocarla desde la función init.
 */
