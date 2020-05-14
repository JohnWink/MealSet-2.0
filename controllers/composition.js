const Composition = require("../models/composition.js")

exports.getAll = (req, res) => {
    Composition.getAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Composições não foram encontradas" })
            }
            else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } else {
            res.status(200).send({ "success": [data] })
        }
    })

}

exports.findById = (req, res) => {
    console.log(req.params.idComposition)
    Composition.findById(req.params.idComposition, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Composição não encontrada" })
            }
            else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } else {

            res.status(200).send({ "success": [data] })
        }
    })
}

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content Cannot be empty!"
        })
    }
    else {
        const composition = new Composition({
            ingredient: req.body.ingredient,
            quantity: req.body.quantity,
            measurement: req.body.measurement
        })

        //Save composition in the database
        Composition.create(composition, (err, data) => {
            if (err) {
                console.log("error catched")
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
            console.log("Sucesso na criação da composição.")
            res.status(201).send({ "success": "Composição criada com sucesso." })

        })
    }
}

exports.update = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content Can't be empty!"
        })
    } else {
        const composition = new Composition({
            ingredient: req.body.ingredient,
            quantity: req.body.quantity,
            measurement: req.body.measurement
        })

        Composition.update(req.params.idComposition, composition, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({ "Not found": "Composição não encontrada" })
                }
                else {
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro"
                    })
                }
            } else {
                res.status(200).send({ "success": "Composição Atualizada com sucesso" })
            }
        })
    }
}