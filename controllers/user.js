const User = require("../models/user.js")


exports.findById = (req,res) =>{
    User.findById(req.params.userId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({"Not found": "User não foi encontrado"})
            }else{
                res.status(500).send({message:err.message ||"Ocorreu um erro"})
            }
        }
        else{
            res.status(200).send({"success": [data]})
        }
    })
}

exports.findAll = (req,res) =>{
    User.findById((err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({"Not found": "Nenhum User foi encontrado"})
            }else{
                res.status(500).send({message:err.message ||"Ocorreu um erro"})
            }
        }
        else{
            res.status(200).send({"success": [data]})
        }
    })
}

exports.register = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"})
    }else{
        const 
    }
}