import express from "express";
import service from "./src/services/reservas.service.js";

import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.get("/reservas", async (req, res) => {
    try{
        const reservas = await service.getAll();
        res.json(reservas);
    }catch(Error){
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
   
})

app.post('/reservas', async (req, res) => {
    try{
       const reservaId = await service.create(req.body)
    return res.json(reservaId);
    }catch(error){
        console.log(error)
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
});

app.listen(3001, () => {
    console.log("Servidor iniciado en el puerto 3001");
});
