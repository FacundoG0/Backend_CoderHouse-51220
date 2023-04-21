// Configuración express
const express = require("express");
const carts_router = express.Router();

const fs = require('fs');

const carts = []

// agregar carrito
carts_router.post("/carts", (req, res) => {

    const cart = {
        cid: "",
        products: [req.body]
    }

    const cant_carts = carts.map(carts => {
        return carts
    });

    cart.cid = cant_carts.length + 1
    
    carts.push(cart)

    res.status(200).send(`Se creó el carrito número ${cart.cid}`)
});


// get cart
carts_router.get("/carts/:cid", (req, res) => {
    // console.log(carts)
    return res.send(carts[req.params.cid - 1]);
})


// agregar prods al carrito
carts_router.post("/:cid/product/:pid", async (req, res) => {
    let cid = parseInt(req.params.cid)
    const selected_cart = carts[cid - 1]

    console.log(selected_cart)

    const data = await fs.promises.readFile("./files/newfile.json");
    let prods = await JSON.parse(data);
    


    // problema PID → dice que no es number
    let pid = parseInt(req.params.pid)

    console.log(`Pid es de tipo ${typeof(pid)}`)

    if (pid == Number || pid == 1){
        console.log("ES UN NUMERO")
    } else {
        console.log("NO ES UN NUMERO")
    }

    
    
    //

    // const selected_product = prods[pid - 1]



    // selected_cart.push(selected_product.id)

    // return res.status(200).send(`Se ha agregado el producto ${selected_product} al carrito número ${cid}`)

});



// export
module.exports = carts_router;