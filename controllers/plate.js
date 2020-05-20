const Plate = require("../models/plate.js")


exports.getAll = (req, res) => {
    Plate.getAll((err, data) => {
        //If something goes wrong getting the data from the database: 
        if (err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `Nenhum prato foi encontrado.`
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


exports.findById = (req, res) => {
    Plate.findById(req.params.idPlate, (err, data) => {
        if (err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    "Not Found": `O prato não foi encontrado.`
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


exports.create = (req, res) => {

    //Validar pedido
    if (!req.body) {
        res.status(400).send({
            message: "Por favor preencha os requisitos"
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
                    message: err.message || "Ocorreu um erro"
                })
            }
            else{
                console.log("Sucesso na criação do prato")
                res.status(201).send({ "success": "Prato criado" })
            }
    

        })
    }
}

exports.delete = (req, res) => {
    Plate.delete(req.params.idPlate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    "Not Found": `O prato não foi encontrado.`
                });
            } else {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            }
        }else{
             res.status(204).send();
        } 
    });
};

exports.deleteAll = (req, res) => {
    Plate.deleteAll(req.params.idRestaurant,(err, data) => {
      if (err){
          if(err.kind ==="not_found"){
            res.status(404).send({
                "Not Found": `O restaurante não foi encontrado.`
            }); 
          }
          else{
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro"
            });
          }
      }
       
      else{
        console.log(data)
        res.status(204).send();
      }
    });
  }

  exports.update=(req,res) =>{
      if(!req.body){
          res.status(400).send({
              mesage:"Por favor preencha os requisitos"
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
                if(err.kind ==="not_found"){
                    res.status(404).send({"Not found": "O prato não foi encontrado"})
                }
                else{
                    res.status(500).send({
                        message:err.message || "Ocorreu um erro"
                    })
                }
              
            }
            else{
                res.status(200).send({"success":"Os dados foram atualizados com sucesso"})
            }
          })
      }
  }