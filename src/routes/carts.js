// Configuración express
const express = require("express");
const carts_router = express.Router();

const fs = require('fs');

const carts = []

carts_router.post("/carts", (req, res) =>{

    const cart = {
        id: "",
        products: [req.body]
    }

    const cant_carts = carts.map(carts => {
        return carts
    });

    cart.id = cant_carts.length + 1

    carts.push(cart)

    console.log(cart)
})

// export
module.exports = carts_router;