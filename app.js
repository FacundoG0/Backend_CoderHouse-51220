// Configuración express
const { json } = require("body-parser");
const express = require("express");
const server = express();
const puerto = 8080;


//Leer FS
const fs = require('fs');

let productos = () => {
    fs.promises.readFile("./files/newfile.json", (error, data) => {
        console.log(JSON.parse(data))
    })
}

// EJECUCIÓN EXPRESS:

productos();