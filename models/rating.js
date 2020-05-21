const db = require("../db")

const Rating = function (rating) {
    this.idRestaurante = rating.idRestaurant
    this.idCliente = rating.idClient
    this.rating = rating.rating
    this.comentario = rating.comment
    this.data_hota = rating.dateHour

}

Rating.getAll = result => {

    db.con.query('SELECT * FROM Rating_Restaurante', function (err, res) {
        if (err) {
            console.log(err)
            result(err, null)
            return
        
        }

        else if(!res[0]){
            result({kind:"not_found"},null)
        }

        else {

            console.log("Ratings: ", res)
            result(null, res)
            return

        }
    })
}

Rating.findByRestaurant = (idRestaurant, result) => {

    db.con.query('SELECT * FROM Rating_Restaurante WHERE idRestaurante = ? AND ativo = 1',
        idRestaurant, function (err, res) {
            if (err) {
                console.log(err)
                return result(err, null)


            }
            else if (!res[0]) {
                return result({ kind: "not_found" }, null)
            }
            else {

                console.log("Ratings: ", res)
                return result(null, res)


            }
        })
}

Rating.create = (newRating, result) => {
    //Preparing to add new composition Database
    db.con.query("INSERT INTO Rating_Restaurante SET ?", newRating, (err, res) => {
        if (err) {
            console.log("error:", err)
            return result(err, null)

        } else {
            console.log("Rating criado")
            return result(null, "Rating criado")

        }
    })
}

module.exports = Rating