const Reservation = require("../models/reservation.js")


exports.findById = (req,res) => {
    Reservation.findById(req.params.idReservation,(err,data)=>{
        if (err) {

            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `A reserva não foi encontrada`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }

        } else {
            res.status(200).send({"success":[data]})
        }
    })
}

exports.findByRestaurant = (req,res) => {
    Reservation.findByRestaurant(req.params.idRestaurant,(err,data)=>{
        if (err) {

            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhuma reserva foi encontrada`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }

        } else {
            res.status(200).send({"success":[data]})
        }
    })
}

exports.findByUser = (req,res) => {
    Reservation.findByUser(req.params.idUser,(err,data)=>{
        if (err) {

            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhuma reserva foi encontrada`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }

        } else {
            res.status(200).send({"success":[data]})
        }
    })
}

exports.create = (req,res) => {
    if(!req.body){
        req.status(400).send({
            message:"Por favor preencha os requisitos"
        })
    }else{
        const reservation = new Reservation({
            idClient:req.params.idUser,
            idTable: req.params.idTable,
            time:req.body.time,
            name:req.body.name,
            n_people:req.body.n_people,
        })

        Reservation.create(reservation,(err,data)=>{
            if (err) {
                console.log("error catched")
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
            else{
                console.log("Sucesso na criação da reserva")
                res.status(201).send({ "success": "Reserva Criada!" })
            }
        })
    }
}

exports.update = (req,res) =>{
    if(!req.body){
        req.status(400).send({
            message:"Por favor preencha os requisitos"
        })
    }else{
        const reservation = new Reservation({
            time:req.body.time,
            name:req.body.name,
            n_people:req.body.n_people,
        })

        Reservation.update(req.params.idReservation,reservation,(err,data)=>{
            if (err) {

                if(err.kind === "not_found"){
                    res.status(404).send({
                        "Not Found": `Nenhuma reserva foi encontrada`
                    }); 
                }
                else{
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro"
                    })
                }
    
            } else {
                res.status(200).send({"success":"A alteração foi atualizada com sucesso!"})
            }
        })
    }
}

exports.confirm = (req,res) =>{
    Reservation.confirm(req.params.idReservation,(err,data)=>{
        if (err) {

            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhuma reserva foi encontrada`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }

        } else {
            res.status(200).send({"Success" : "A reserva foi confirmada"})
        }
    })
}

exports.deleteById = (req,res) =>{
    Reservation.deleteById(req.params.idReservation,(err,data)=>{
        if (err) {

            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhuma reserva foi encontrada`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }

        } else {
            res.status(204).send()
        }
    })
}

exports.deleteByRestaurant = (req,res) =>{

    Reservation.deleteByRestaurant(req.params.idRestaurant,(err,data)=>{
        if (err) {

            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhuma reserva foi encontrada`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }

        } else {
            res.status(204).send()
        }
    })
}

