const Composition = require("../models/composition.js")
const Ingredient = require("../models/ingredient.js")

exports.getAll = (req, res) => {
    Composition.getAll(req.params.idPlate,(err, data) => {
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
            measurement: req.body.measurement,
            idPlate: req.params.idPlate
        })
        //Check if the ingredient already exists
        Ingredient.findById(req.body.ingredient,(err,data) =>{

           // if there's an error detected, seperate the errors
            if(err){
                // if it doesn't exist, create a new one
                if (err.kind === "not_found") {
                    Ingredient.create(req.body.ingredient,(err,data)=>{
                        // If the ingredient isn't created, return error
                        if(err){
                            console.log("error catched")
                            res.status(500).send({
                            message: err.message || "Ocorreu um erro"
                            })
                        }
                        // If the ingredient is created, create the composition
                        else{
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
                    })
                }
                // if there's a fundamental error on the model, return error
                else {
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro"
                    })
                }
            }
            // if there's no errors and the ingredient already exists, create composition
            else{
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
        Ingredient.findById(req.body.ingredient,(err,data)=>{
            if(err){
                if(err.kind==="not_found"){
                    Ingredient.create(req.body.ingredient,(err,data)=>{
                        if(err){
                            res.status(500).send({message:err.message || "Ocorreu um erro"})
                        }
                        else{
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
                    })
                }else{
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro"
                    })
                }
            }else{
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
        })
      
    }
}

exports.delete = (req,res) =>{
    Composition.delete(req.params.idComposition,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({"Not found": "Composição não encontrada"})
            }
            else{
                res.status(500).set({message:err.message||"Ocorreu um erro"})
            }
        }
        else{
            res.status(204).send()
        }
    })
}

exports.deleteAll = (req,res) =>{
    Composition.deleteAll(req.params.idPlate,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({"Not found": "Composição não encontrada"})
            }
            else{
                res.status(500).set({message:err.message||"Ocorreu um erro"})
            }
        }
        else{
            res.status(204).send()
        }
    })
}
