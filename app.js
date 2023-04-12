// Configuración express
const express = require("express");
const server = express();
const puerto = 8080;

const fs = require('fs');

// OBTENER TODOS LOS PRODUCTOS
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

// OBTENER LA CANTIDAD INDICADA DE PRODUCTOS
let getlimit = async () => {
    try{
        const data = await fs.promises.readFile("./files/newfile.json");
        let prods = await JSON.parse(data);

        server.get("/products", (req, res) => {

            const limit = req.query.limit
            const productos_filtrados = []

            for (let i = 0; i <= limit; i++) {
                const indice = i - 1
                const producto = prods[indice];
                productos_filtrados.push(producto)
            }

            return res.send(productos_filtrados)

        })
    }
    
    catch(err){
        console.log(err);
    }
}

// OBTENER PRODUCTOS POR ID
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

server.listen(puerto, () => {
    console.log(`Servidor express escuchando en puerto ${puerto}`)
})


// EJECUCIÓN:
//getallprods();
getoneprod();
getlimit();