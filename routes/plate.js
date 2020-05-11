module.exports = app => {

    const plates = require("../controllers/plate.js")

    app.get('/plates', plates.getAll)

    app.post('/plates', plates.create)

    app.get('/plates/:plateId', plates.findById)

    app.delete("/plates/:plateId", plates.delete);

    app.delete("/platesDelete", plates.deleteAll);
}


