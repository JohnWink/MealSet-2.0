const Plate = require("../models/plate.js")


exports.getAll = (req, res) => {
    Plate.getAll((err, data) => {
        //If something goes wrong getting the data from the database: 
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving plates"
            })
        } else {
            res.send(data)
        }
    })

}


exports.findById = (req, res) => {
    Plate.findById(req.params.idPlate, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || err
            })
        } else {
            res.send(data)
        }
    })
}


exports.create = (req, res) => {

    //Validar pedido
    if (!req.body) {
        res.status(400).send({
            message: "Contend Cannot be empty!"
        })
    }
    else {
        //Create Plate
        const plate = new Plate({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            foto: req.body.foto,
            idRestaurant: req.params.idRestaurant
        })

        //Save Plate in the database
        Plate.create(plate, (err, data) => {
            if (err) {
                console.log("error catched")
                res.status(500).send({
                    message: err.message || err
                })
            }
            console.log("Sucesso na criação do prato")
            res.status(201).send({ message: "Success" })

        })
    }
}

exports.delete = (req, res) => {
    Plate.remove(req.params.idPlate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Prato com o id ${req.params.idPlate} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Prato com o id ${req.params.idPlate} não eliminado.`
                });
            }
        } else res.send({ message: `Prato com o id ${req.params.idPlate} foi eliminado!` });
    });
};

exports.deleteAll = (req, res) => {
    Plate.deleteAll(req.params.idRestaurant,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all plates."
        });
      else res.send({ message: `All plates were deleted successfully!` });
    });
  }

  exports.update=(req,res) =>{
      if(!req.body){
          res.status(400).send({
              mesage:"Content cannot be empty!"
          })
      }
      else{
          const plate = new Plate({
              name:req.body.name,
              description: req.body.description,
              price: req.body.price,
              foto: req.body.photo
          })

          Plate.update(req.params.idPlate,plate,(err,data)=>{
            if(err){
                res.status(500).send({
                    message:err.message || err
                })
            }
            else{
                res.status(200).send({"success":data})
            }
          })
      }
  }