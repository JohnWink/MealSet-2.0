module.exports = app =>{
    const composition = require("../controllers/composition.js")

    app.get('/composition', composition.getAll)

    app.get('/composition/:idComposition', composition.findById)

    app.post('/composition/', composition.create)

    app.put('/composition/:idComposition', composition.update)
}