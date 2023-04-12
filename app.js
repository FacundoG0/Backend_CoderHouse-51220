// Configuración express
const express = require("express");
const server = express();
const puerto = 8080;


//Leer FS
const fs = require('fs');

let productos = async () => {
        try{
            const data = await fs.promises.readFile("./files/newfile.json");
            let prods = await JSON.parse(data);

            return [
                server.get("/products", (req, res) => {
                    res.send(prods)
                })
            ]
        }
     
        catch(err){
            console.log(err);
        }
    }

// EJECUCIÓN EXPRESS:
productos();

server.listen(puerto, () => {
    console.log(`Servidor express escuchando en puerto ${puerto}`)
})