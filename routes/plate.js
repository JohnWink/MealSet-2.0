module.exports = app =>{

    const plates = require("../controllers/plate.js")

    app.get('/plates', plates.getAll)

    app.post('/plates', plates.create)

    app.get('/plates/:platesID', plates.findById)

    
}


