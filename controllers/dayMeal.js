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
    
        DayMeal.findById(req.params.idDayMeal,req.params.idPlate,(err,data)=>{

            if (err) {

                if (err.kind === "not_found") {

                   DayMeal.create(req.params.idDayMeal,req.params.idPlate,(err,data)=>{

                    if (err) {

                            res.status(500).send({
                                message: err.message || "Ocorreu um erro"
                            })

                    } else {
                        res.status(201).send({ "success": "Prato do dia criado" })
                    }
                   })

                } else {
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro"
                    })
                }
            } else {
                res.status(409).send({ "conflict": "O prato do dia já existe" })
            }
        })
    
}

exports.update = (req,res) =>{
    DayMeal.findById(req.params.idDayMeal,req.params.idPlate,(err,data)=>{

        if (err) {

            if (err.kind === "not_found") {

               DayMeal.update(req.params.idDayMeal,req.params.idPlate,(err,data)=>{

                if (err) {
                    if(err.kind==="not_found"){
                        res.status(404).send({ "Not found": "Ou o prato ou o dia não foi encontrado" })
                    }
                    else{
                        res.status(500).send({
                            message: err.message || "Ocorreu um erro"
                        })
                    }

                       

                } else {
                    res.status(200).send({ "success": "Prato do dia foi atualizado" })
                }
               })

            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } else {
            res.status(409).send({ "conflict": "O prato do dia já existe" })
        }
    })
}

exports.delete = (req,res) =>{
    DayMeal.delete(req.params.idDayMeal,req.params.idPlate,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "O prato do dia não foi encontrado" })
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        }
        else {
            res.status(204).send()
        }
    })
}

exports.deleteByRestaurant = (req,res) =>{

    DayMeal.deleteByRestaurant(req.params.idRestaurant,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Nenhum prato do dia foi encontrado" })
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        }
        else {
            res.status(204).send()
        }
    })
}

exports.deleteByPlate = (req,res) =>{

    DayMeal.deleteByPlate(req.params.idPlate,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ "Not found": "Nenhum prato do dia foi encontrado" })
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        }
        else {
            res.status(204).send()
        }
    })
}

