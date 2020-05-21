const DayMeal = require("../models/dayMeal.js")

exports.findbyRestaurant = (req,res) =>{
    DayMeal.findByRestaurant(req.params.idRestaurant,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Os pratos do dia não foram encontrados" })
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } else {
            res.status(200).send({ "success": [data] })
        }
    })
}

exports.findByDay = (req,res) =>{
    DayMeal.findByDay(req.params.idDayMeal,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Os pratos do dia não foram encontrados" })
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } else {
            res.status(200).send({ "success": [data] })
        }
    })
}

exports.findByPlate = (req,res) =>{
    DayMeal.findByPlate(req.params.idPlate,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Os pratos do dia não foram encontrados" })
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } else {
            res.status(200).send({ "success": [data] })
        }
    })
}

exports.create = (req,res) =>{

}

exports.update = (req,res) =>{

}

exports.delete = (req,res) =>{

}

exports.deleteByRestaurant = (req,res) =>{

}

exports.deleteByPlate = (req,res) =>{

}

