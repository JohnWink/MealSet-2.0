const path = require('path');




const app =require('../views/server');
const router = require('express').Router();


/* 
router.get('/',function(req,res){

})

*/
module.exports = app =>{
    const controller = require("../controllers/controller")

    app.get('/landingPage',controller.restaurants)
}





