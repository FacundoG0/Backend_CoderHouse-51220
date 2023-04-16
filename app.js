// Configuración express
const express = require("express");
const server = express();
const puerto = 8080;

const fs = require('fs');

// OBTENER TODOS LOS PRODUCTOS
server.get("/products", async (req, res) => {
    try {
        const data = await fs.promises.readFile("./files/newfile.json");
        let prods = await JSON.parse(data);
        
        // OBTENER CANTIDAD DE PRODUCTOS INDICADOS
        const limit = parseInt(req.query.limit)

        if (limit > 0){
            console.log("Devolviendo parametro limit")
            let newarr = prods.slice(0, limit)
            return res.send(newarr)
        } else {
            console.log("Retornando todos los productos")
            return res.send(prods)
        }
    }
    catch (err){
        console.log(err);
    }
})


// OBTENER PRODUCTOS POR ID
server.get("/products/:id", async (req, res) => {
    try{
        const data = await fs.promises.readFile("./files/newfile.json");
        let prods = await JSON.parse(data);

        let founded = prods.find(data => data.id == req.params.id)

        if (!founded) {
            return res.send(`No existe producto con ID ${req.params.id}`)    
        } else {
            return res.send(founded)
        }
    }
        
    catch(err){
        console.log(err);
    }        
        
})


server.listen(puerto, () => {
    console.log(`Servidor express escuchando en puerto ${puerto}`)
})