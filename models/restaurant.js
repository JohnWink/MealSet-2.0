const db = require("../models/db")

//Constructor
const Restaurant = function (restaurant) {
    this.nome = restaurant.name
    this.descrição = restaurant.description
    this.estacionamento = restaurant.parking
    this.coverFoto = restaurant.foto
    this.gps = restaurant.gpsAddress
    this.morada = restaurant.address
    this.Codigo_postal = restaurant.zipCode

}
// Gets All restaurants from Database
Restaurant.getAll = result => {

    db.con.query('SELECT * FROM Restaurante;', function (err, res) {
        if (err) {
            console.log(err)
            result(err, null)
            return
        } else {

            console.log("Restaurants: ", res)
            result(null, res)
            return

        }
    })
}

// Gets ONE Selected Restaurant from Database
Restaurant.findById = (restaurantId, result) => {

    //Send prepared command to Database
    db.con.query("SELECT * FROM Restaurante WHERE idRestaurante = ?", restaurantId, (err, res) => {

        // If there's any problem with the data retrieval 
        if (err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        // If there's the found Restaurant
        else if (res[0]) {
            result(null, res[0])
            return
        }
        // If there's no restaurant found
        else {
            result({ kind: "not_found" }, null)
            return
        }
    })

}

Restaurant.create = (newRestaurant, result) => {
    //Preparing to add new restaurant Database
    db.con.query("INSERT INTO Restaurante SET ?", newRestaurant, (err, res) => {
        if (err) {
            console.log("error:", err)
            result(err, null)

        } else {
            console.log("Restaurante criado")
            result(null, res)
        }
    })

    return
}

module.exports = Restaurant