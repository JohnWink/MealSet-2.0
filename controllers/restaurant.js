const Restaurant = require("../models/restaurant.js")


 exports.getAll = (req,res) =>{
    Restaurant.getAll((err,data)=>{
        //If something goes wrong getting the data from the database: 
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving restaurants"
            })
        }else{
            res.status(200).send({"success":[data]})
        }
    })
   
}

exports.findById = (req,res) =>{
    console.log(req.params.idRestaurant)
    Restaurant.findById(req.params.idRestaurant,(err,data)=>{
        if(err){
            res.status(500).send({
                message:err.message || err
            })
        }else{
           
            res.status(200).send({"success":[data]})
        }
    })
}


exports.create = (req,res) =>{

    //Validar pedido
    if(!req.body){
        res.status(400).send({
            message:"Content Cannot be empty!"
        })
    }
    else{
        //Create Restaurant
        const restaurant = new Restaurant ({
            name: req.body.name,
            description: req.body.description,
            parking: req.body.parking,
            foto: req.body.foto,
            gpsAdress: req.body.gps,
            address: req.body.address,
            zipCode: req.body.zipCode
        })

        //Save Restaurant in the database
        Restaurant.create(restaurant,(err,data)=>{
            if(err){
                console.log("error catched")
                res.status(500).send({
                    message:err.message || err
                })
            }
                console.log("Sucesso na criação do restaurante")
                res.status(201).send({message:"success"})
            
        })
    }
}

exports.update = (req,res) =>{
    //validate request
    if(!req.body){
        res.status(400).send({
            message:"Content Can't be empty!" 
        })
    }else{
 
       const restaurant = new Restaurant({
            name: req.body.name,
            description: req.body.description,
            parking: req.body.parking,
            foto: req.body.foto,
            gpsAdress: req.body.gps,
            address: req.body.address,
            zipCode: req.body.zipCode
       })

       Restaurant.update(req.params.idRestaurant,restaurant,(err,data)=>{
           if(err){
               res.status(500).send({
                   message:err.message || err
               })
           }else{
               res.status(200).send({"success": data})
           }
       })
    }
}

exports.delete = (req,res) =>{
    Restaurant.delete(req.params.idRestaurant,(err,data)=>{
        if(err){
            res.status(500).send({
                message:err.message || err
            })
        }else{
            res.status(204).send()
        }
    })
}
