// Configuración express
const express = require("express");
const server = express();
const puerto = 8080;


//Leer FS
const fs = require('fs');

let getallprods = async () => {
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


let getoneprod = async () => {
    try{
        const data = await fs.promises.readFile("./files/newfile.json");
        let prods = await JSON.parse(data);

        server.get("/products/:id", (req, res) => {

            let founded = prods.find(data => data.id == req.params.id)

            if (!founded) {
                return res.send(`No existe producto con ID ${req.params.id}`)    
            } else {
                return res.send(founded)
            }

        })
    }
    
    catch(err){
        console.log(err);
    }
}

// EJECUCIÓN:
getallprods();
getoneprod();

server.listen(puerto, () => {
    console.log(`Servidor express escuchando en puerto ${puerto}`)
})