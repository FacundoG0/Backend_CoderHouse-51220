// Configuración express
const express = require("express");
const mongoose_router = express.Router();

const userModel = require("./schema.js");


mongoose_router.get('/mongoose', async (req, res) => {
    try{
        
        const users = await userModel.find();
        
        res.render("home", {
            users
        })
    }
    
    catch(err){
        console.log(err);
    }

});

module.exports = mongoose_router;