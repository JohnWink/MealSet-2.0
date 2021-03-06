const db = require("../db")

//Constructor
const Plate = function (plate) {
    this.nome = plate.name
    this.descrição = plate.description
    this.preço = plate.price
    this.foto = plate.photo
    this.idRestaurante = plate.idRestaurant

}
// Gets All plates from Database
Plate.getAll = result => {

    db.con.query('SELECT * FROM Prato', function (err, res) {
        if (err) {
            console.log(err)
            result(null, err)
            return
        } 
        else if (!res[0]){
            result({kind:"not_found"},null)
        } 
        else{

            console.log("Plates: ", res)
            result(null, res)
            return

        }
    })
}


// Gets ONE Selected plate from Database
Plate.findById = (plateId, result) => {
    console.log("ID DO PRATO: " + plateId)
    //Send prepared command to Database
    db.con.query("SELECT * FROM Prato WHERE idPrato = ? AND ativo = 1", plateId, (err, res) => {

        // If there's any problem with the data retrieval 
        if (err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        // If there's the found plate
        else if (res[0]) {
            result(null, res[0])
            return
        }
        // If there's no plate found
        else {
            result({ kind: "not_found" }, null)
            return
        }
    })

}

Plate.create = (newPlate, result) => {
    //Preparing to add new plate Database
    db.con.query("INSERT INTO Prato SET ?", newPlate, (err, res) => {
        if (err) {
            console.log("error:", err)
            result(err, null)

        } else {
            console.log("Prato criado")
            result(null, res)
        }
    })

    return
}

Plate.delete = (plateId, result) => {
    db.con.query("UPDATE Prato SET ativo = 0 WHERE id = ? AND ativo = 1", plateId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found plate with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with id: ", plateId);
        result(null, res);
    });
};

Plate.deleteAll = (restaurantId,result) => {
    db.con.query("UPDATE Prato SET ativo = 0 WHERE idRestaurante = ? AND ativo = 1",restaurantId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(null, err);
        
      }
      else if(res.affectedRows == 0){
        return result({kind:"not_found"},null)
      }
      else{
        console.log(`deleted ${res.affectedRows} plates`);
        return result(null, res);
      }
  
     
    });
  };

  Plate.update=(id, plate,result)=>{
      db.con.query("UPDATE Prato SET nome=?,descrição=?,preço=?,foto=? WHERE idPrato = ? AND ativo = 1",
      [plate.nome, plate.descrição, plate.preço,plate.foto,id],
      (err,res)=>{
          if(err){
              result(err,null)
          }
          else if(res.affectedRows == 0){
              result({kind:"not_found"}, null)
          }
          else{
              result(null,{plate})
          }
      })
  }

module.exports = Plate