// Configuración express
const express = require("express");
const server = express();
const puerto = 8080;


//Leer FS
const fs = require('fs');

let productos = async () => {
        try{
            const data = await fs.promises.readFile("./files/newfile.json");
            console.log(await JSON.parse(data));
        }
     
        catch(err){
            console.log(err);
        }
    }

// EJECUCIÓN EXPRESS:
productos();