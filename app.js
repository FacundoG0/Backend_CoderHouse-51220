// Configuración express
const express = require("express");
const server = express();
const puerto = 8080;

const fs = require('fs');
const { type } = require("os");

// OBTENER TODOS LOS PRODUCTOS
server.get("/products", async (req, res) => {
    try {
        const data = await fs.promises.readFile("./files/newfile.json");
        let prods = await JSON.parse(data);
        
        // OBTENER CANTIDAD DE PRODUCTOS INDICADOS
        const limit = req.query.limit
        
        if (typeof(limit) != String){
            return res.send(prods)
        } else {
            console.log("se lee")
            let newarr = prods.slice(0, limit)
            return res.send(newarr)
        }
    }
    catch (err){
        console.log(err);
    }
})

// OBTENER LA CANTIDAD INDICADA DE PRODUCTOS
// server.get("/products", async (req, res) => {
//     try {
//         const data = await fs.promises.readFile("./files/newfile.json");
//         let prods = await JSON.parse(data);

//         const limit = req.query.limit
//         const productos_filtrados = []
        
//         productos_filtrados.map(() => {
//             return res.send(productos_filtrados)
//         })
//     }
    
//     catch (err){
//         console.log(err);
//     }   
// })


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