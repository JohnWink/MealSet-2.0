const Ingredient = require("../models/ingredient.js")

exports.getAll = (req,res) =>{
 Ingredient.getAll((err,data)=>{
     if(err){
         res.status(500).send({
             message:err.message || "Ocorreu um erro"
         })
     }else{
         res.status(200).send({"success":[data]})
     }
 })
}

exports.findById = (req,res) =>{
    Ingredient.findById(req.params.idIngredient,(err,data)=>{
        if(err){
            res.status(500).send({
                message:err.message||err
            })
        }
        else{
            res.status(200).send({"success":[data]})
        }
    })
}

exports.update = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"})
    }
    else{
        Ingredient.update(req.params.idIngredient , req.body.name ,(err,data)=>{
            if(err){
                res.status(500).send({
                    message:err.message||err
                })
            }
            else{
                res.status(200).send({"success":"O ingrediente foi atualizado com sucesso"})
            }
        })
    }
}

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"Por favor preencha os requisitos"})
    }
    else{
        Ingredient.create(req.body.name ,(err,data)=>{
            if(err){
                res.status(500).send({
                    message:err.message||err
                })
            }
            else{
                res.status(201).send({"success":"O ingrediente foi criado com sucesso"})
            }
        })
    }
}

exports.delete = (req,res) =>{
    Ingredient.delete(req.params.idIngredient,(err,data)=>{
        if(err){
            res.status(500).send({
                message:err.message|| err
            })
        }
        else{
            res.status(204).send()
        }
    })
}