// Configuración express
const express = require("express");
const product_router = express.Router();

const fs = require('fs');


//**************************************************************************************************************************************
//                                                          GETS
//**************************************************************************************************************************************

// OBTENER TODOS LOS PRODUCTOS
product_router.get("/products", async (req, res) => {
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
product_router.get("/products/:id", async (req, res) => {
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



//**************************************************************************************************************************************
//                                                          POST
//**************************************************************************************************************************************

// necesito saber porqué si hago el get a products solo no me anda.. prueben haciendo un get a otra ruta y si anda, pero a products no
product_router.post("/products", async (req, res) => {
    try{
        const new_prod = req.body

        if (!new_prod.title || !new_prod.description || !new_prod.code || !new_prod.price || !new_prod.stock || !new_prod.category){
            return console.log("Faltan campos")
        } else {
            res.status(200).send("Post enviado")
            
            const data = await fs.promises.readFile("./files/newfile.json");
            let prods = await JSON.parse(data);

            const all_prods = prods.map(product => {
                return product
            })

            new_prod.id = all_prods.length + 1

            if (!new_prod.status){
                new_prod.status = true
            }
            
            all_prods.push(new_prod)

            return fs.promises.writeFile("./files/newfile.json", JSON.stringify(all_prods), "utf-8")
        }
    }
    catch(err){
        console.log(err);
    }     
})

//**************************************************************************************************************************************
//                                                          PUT
//**************************************************************************************************************************************






// export
module.exports = product_router;