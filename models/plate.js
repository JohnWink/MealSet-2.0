const db = require("../models/db")

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

    db.con.query('SELECT * FROM Prato;', function (err, res) {
        if (err) {
            console.log(err)
            result(null, err)
            return
        } else {

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
    db.con.query("SELECT * FROM Prato WHERE idPrato = ?", plateId, (err, res) => {

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

Plate.remove = (plateId, result) => {
    db.con.query("DELETE FROM Prato WHERE id = ?", plateId, (err, res) => {
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

Plate.removeAll = result => {
    db.con.query("DELETE FROM Prato", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} plates`);
      result(null, res);
    });
  };

module.exports = Plate