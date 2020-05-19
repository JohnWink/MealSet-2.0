const Rating = require("../models/rating.js")
const Comment = require("../models/comment.js")

exports.getAll = (req, res) => {
    Rating.getAll((err, data) => {
        //If something goes wrong getting the data from the database: 
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Ratings não foram encontrados" })
            }
            else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }

        } else {
            res.setHeader("Content-Type", "application/json; charset=utf-8")
            res.status(200).send({ "success": [data] })
        }
    })

}


exports.findByRestaurant = (req, res) => {
    Rating.findByRestaurant(req.params.idRestaurant, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Ratings não encontrados" })
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
        const rating = new Rating({
            idRestaurant: req.params.idRestaurant,
            idClient: req.params.idClient,
            rating: req.body.rating,
            comment: req.body.comment,
            dateHour: req.body.dateHour
        })
        //Check if the comment already exists
        Comment.findById(req.body.comment, (err, data) => {

            // if there's an error detected, seperate the errors
            if (err) {
                // if it doesn't exist, create a new one
                if (err.kind === "not_found") {
                    Comment.create(req.body.comment, (err, data) => {
                        // If the comment isn't created, return error
                        if (err) {
                            console.log("error catched")
                            res.status(500).send({
                                message: err.message || "Ocorreu um erro"
                            })
                        }
                        // If the comment is created, create the rating
                        else {
                            //Save rating in the database
                            Rating.create(rating, (err, data) => {
                                if (err) {
                                    console.log("error catched")
                                    res.status(500).send({
                                        message: err.message || "Ocorreu um erro"
                                    })
                                }
                                console.log("Sucesso na criação do Rating.")
                                res.status(201).send({ "success": "Rating criado com sucesso." })

                            })
                        }
                    })
                }
                // if there's a fundamental error on the model, return error
                else {
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro"
                    })
                }
            }
            // if there's no errors and the comment already exists, create rating
            else {
                //Save rating in the database
                Rating.create(rating, (err, data) => {
                    if (err) {
                        console.log("error catched")
                        res.status(500).send({
                            message: err.message || "Ocorreu um erro"
                        })
                    }
                    console.log("Sucesso na criação do Rating.")
                    res.status(201).send({ "success": "Rating criado com sucesso." })

                })
            }
        })

    }
}