module.exports = app => {

    const plates = require("../controllers/plate.js")

    app.get('/plates', plates.getAll)

    app.get('/plates/:idPlate', plates.findById)

    app.put('/plates/:idPlate',plates.update)

    app.post('/restaurants/:idRestaurant/plates', plates.create)

    app.delete("/plates/:idPlate", plates.delete);

    app.delete("/restaurants/:idRestaurant/plates", plates.deleteAll);
}


