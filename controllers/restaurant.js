const Restaurant = require("../models/restaurant.js")


 exports.getAll = (req,res) =>{
    Restaurant.getAll((err,data)=>{
        //If something goes wrong getting the data from the database: 
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving restaurants"
            })
        }else{
            res.send(data)
        }
    })
   
}

exports.findById = (req,res) =>{
    Restaurant.findById(req.params.restaurantId,(err,data)=>{
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
                console.log("Sucesso")
                res.status(201).send({message:"Success"})
            
        })
    }
}
