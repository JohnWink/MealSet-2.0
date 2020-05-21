module.exports = app => {
    const rating = require("../controllers/restaurant_rating.js")

    app.get('/ratings', rating.getAll)

    app.get('/restaurants/:idRestaurant/users/:idUser/ratings', rating.findById);

    app.get('/restaurants/users/:idUser/ratings', rating.findByUser);

    app.get('/restaurants/:idRestaurant/ratings', rating.findByRestaurant)

    //create n ta a funcionar :(
    app.post('/restaurants/:idRestautant/users/:idUser/ratings', rating.create)

    //lol n dá
    app.put('/restaurants/:idRestautant/users/:idUser/ratings', rating.update)

    //tmb n lol
    app.delete('/restaurants/:idRestaurant/users/:idUser/ratings', rating.delete);

    app.delete('/restaurants/users/:idUser/ratings', rating.deleteByUser);
}