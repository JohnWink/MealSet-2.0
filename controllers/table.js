const Table = require("../models/table.js")

exports.getAll = (req,res) =>{
    Table.getAll(req.params.idRestaurant,(err,data) =>{
        if(err){
            res.status(500).send({message:err.message ||"Ocorreu um erro"})
        }
        else{
            res.status(200).send({"success":[data]})
        }
    })
}

exports.findById = (req,res) => {
    Table.findById = (req.params.idTable,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message || "Ocorreu um erro"})
        }
        else{
            res.status(200).send({"success": [data]})
        }
    })
}

exports.create = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"})
    }
    else{
        
        const table = new Table({
            name: req.body.name,
            size: req.body.size,
            description: req.body.description,
            smoking:req.body.smoking,
            outside:req.body.outside,
            idRestaurant: req.params.idRestaurant
        })
       
        Table.create (table,(err,data)=>{
            if(err){
               
                res.status(500).send({message:err.message || "Ocorreu um erro"})
            }
            else{
                
                res.status(201).send({"success":"Registo Criado"})
            }
        })
    }
}

exports.update = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"})
    }
    else{
        const table = new Table({
            name: req.body.name,
            size: req.body.size,
            description: req.body.description,
            smoking:req.body.smoking,
            outside:req.body.outside,
        })

        Table.update(req.params.idTable,table,(err,data)=>{
            if(err){
                res.status(500).send({message:err.message || "Ocorreu um erro"}) 
            }
            else{
                res.status(200).send({"success":"Os dados foram atualizados com sucesso"})
            }
        })
       
    }
}

exports.delete = (req,res) =>{
    Table.delete(req.params.idTable,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message || "Ocorreu um erro"})
        }
        else{
            res.status(204).send()
        }
    })
}

exports.deleteAll = (req,res) =>{
    Table.deleteAll(req.params.idRestaurant,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message || "Ocorreu um erro"})
        }
        else{
            res.status(204).send()
        }
    })
}