module.exports = app =>{
    const rating = require("../controllers/rating.js")

    app.get('/ratings', rating.getAll)

    app.get('/restaurants/:idRestaurant/ratings', rating.findByRestaurant)

    app.post('/restaurantes/:idRestaurant/ratins', rating.create)

    /*app.put('/compositions/:idComposition', composition.update)

    app.delete('/compositions/:idComposition',composition.delete)

    app.delete('/plates/:idPlate/compositions/',composition.deleteAll)*/
}