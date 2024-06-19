import express from "express";
import service from "./src/services/ingresos.service.js";

import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.get("/ingresos", async (req, res) => {
    try{
        const ingresos = await service.getAll();
        res.json(ingresos);
    }catch(e){
        console.log(e)
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
   
})

app.post('/ingresos', async (req, res) => {
    try{
       const ingresoId = await service.create(req.body)
    return res.json(ingresoId);
    }catch(e){
        console.log(e)
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
});

app.listen(3001, () => {
    console.log("Servidor iniciado en el puerto 3001");
});
