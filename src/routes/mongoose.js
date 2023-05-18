// Configuración express
const express = require("express");
const mongoose_router = express.Router();

const userModel = require("./schema.js");

const users = userModel.find();

console.log(users)

mongoose_router.get('/mongoose', async (req, res) => {
    try{
        res.render("home", {
            users
        })
    }
    
    catch(err){
        console.log(err);
    }

});

module.exports = mongoose_router;