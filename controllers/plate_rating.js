const Rating = require("../models/plate_rating.js")

exports.findById = (req,res) =>{
 
    Rating.findById(req.params.idPlate,req.params.idUser,(err,data)=>{
      
        if (err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhum Rating foi encontrado.`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } 
        else {
            res.status(200).send({"success":[data]})
        }
    })
}

exports.findByPlate = (req,res) =>{
    Rating.findByPlate(req.params.idPlate,(err,data)=>{
        if (err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhum Rating foi encontrado.`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } 
        else {
            res.status(200).send({"success":[data]})
        }
    }) 
}

exports.findByUser = (req,res) =>{
    Rating.findByUser(req.params.idUser,(err,data)=>{
        if (err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhum Rating foi encontrado.`
                }); 
            }
            else{
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                })
            }
        } 
        else {
            res.status(200).send({"success":[data]})
        }
    })
}

exports.create = (req,res) =>{

    if(!req.body){
        req.status(400).send({
            message:"Por favor preencha os requisitos"
        })
    }

    else{
        // Check if the Rating already exists
        Rating.findById(req.params.idPlate,req.params.idUser,(err,data)=>{
            if (err) {
                // if the rating doesn't exist yet
                if(err.kind === "not_found"){
                    // Create Rating
                    Rating.create(req.params.idPlate,req.params.idUser,req.body.value,(err,data)=>{
                        if (err) {
                            console.log("error catched")
                            res.status(500).send({
                                message: err.message || "Ocorreu um erro"
                            })
                        }
                        else{
                            console.log("Sucesso na criação do rating")
                            res.status(201).send({ "success": "Rating Efetuado" })
                        }
                    })
                }
                else{
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro"
                    })
                }
            } 
            //If the Rating already exists
            else {
                res.status(409).send({"Conflict":"O user já fez o rating"})
            }
        })
        
    }
    
}

exports.update = (req,res) =>{
    if(!req.body){
        req.status(400).send({
            message:"Por favor preencha os requisitos"
        })
    }
    else{
        Rating.update(req.params.idPlate,req.params.idUser,req.body.value,(err,data)=>{
            if(err){
                if(err.kind ==="not_found"){
                    res.status(404).send({"Not found": "O rating não foi encontrado"})
                }
                else{
                    res.status(500).send({
                        message:err.message || "Occorreu um erro"
                    })
                }
              
            }
            else{
                res.status(200).send({"success":"O rating foi atualizado com sucesso!"})
            }
        })
    }
}


exports.delete =(req,res) =>{
    Rating.delete(req.params.idPlate,req.params.idUser,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    "Not Found": `O rating não foi encontrado.`
                });
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            }
        }else{
             res.status(204).send();
        } 
    })
}

exports.deleteByUser = (req,res) =>{
    Rating.deleteByUser(req.params.idUser,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    "Not Found": `Os ratings do user não foi encontrado.`
                });
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            }
        }else{
             res.status(204).send();
        } 
    })
}