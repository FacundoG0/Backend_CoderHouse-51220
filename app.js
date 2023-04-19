// Configuración express
const express = require("express");
const product_router = require("./src/routes/products.js")

const puerto = 8080;
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Invocación de routers
server.use("/api", product_router);



server.listen(puerto, () => {
    console.log(`Servidor inciado en puerto: ${puerto}`);
});