// Configuración express
const express = require("express");
const carts_router = express.Router();

const fs = require('fs');

const carts = []

carts_router.post("/carts", async (req, res) =>{

    let cart = {
        id: "",
        products: [req.body]
    }

    const cant_carts = carts.map(carts => {
        return carts
    });

    cart.id = cant_carts.length + 1

    res.send(carts)
})