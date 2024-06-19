const URL = 'http://localhost:3001/reservas'

async function getReservas(){
    const res = await fetch(URL)
    const data = await res.json()
    return data;
}

async function saveReserva(reserva){

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserva)
    };

    const res = await fetch(URL, requestOptions)
    const data = await res.json()
    return data
}
/*const deleteReserva = async (id) => {
    await fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
};*/

export default {getReservas, saveReserva, deleteReserva}