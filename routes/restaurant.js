//const path = require('path');
//const app =require('../views/server');
//const router = require('express').Router();


/* 
router.get('/',function(req,res){

})

*/

module.exports = app =>{

    const restaurants = require("../controllers/restaurant.js")

    app.get('/restaurants',restaurants.getAll)

    app.post('/restaurants', restaurants.create)

    app.get('/restaurants/:restaurantId', restaurants.findById)

    
}





