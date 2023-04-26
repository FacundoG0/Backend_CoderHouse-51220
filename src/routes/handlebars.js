// Configuración express
const express = require("express");
const handle_router = express.Router();

const fs = require('fs');

// HANDLEBARS
handle_router.get('/home', async (req, res) => {

    const data = await fs.promises.readFile("./files/newfile.json");
    let prods = await JSON.parse(data);

    let products = prods.map(product => {
        return product
    })

    res.render("home", {
        products
    })
})


module.exports = handle_router;