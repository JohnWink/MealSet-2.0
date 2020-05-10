const Plate = require("../models/plate.js")


 exports.getAll = (req,res) =>{
    Plate.getAll((err,data)=>{
        //If something goes wrong getting the data from the database: 
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving plates"
            })
        }else{
            res.send(data)
        }
    })
   
}


exports.findById = (req,res) =>{
    Plate.findById(req.params.plateId,(err,data)=>{
        if(err){
            res.status(500).send({
                message:err.message || err
            })
        }else{
            res.send(data)
        }
    })
}


exports.create = (req,res) =>{

    //Validar pedido
    if(!req.body){
        res.status(400).send({
            message:"Contend Cannot be empty!"
        })
    }
    else{
        //Create Plate
        const plate = new Plate ({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            foto: req.body.foto
        })

        //Save Plate in the database
        Plate.create(plate, (err,data)=>{
            if(err){
                console.log("error catched")
                res.status(500).send({
                    message:err.message || err
                })
            }
                console.log("Sucesso")
                res.status(201).send({message:"Success"})
            
        })
    }
}
