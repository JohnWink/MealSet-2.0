const db = require("./db")

const Rating = function (rating) {
    this.idRestaurante = rating.idRestaurant
    this.idCliente = rating.idUser
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

        else if (!res[0]) {
            result({ kind: "not_found" }, null)
        }

        else {

            console.log("Ratings: ", res)
            result(null, res)
            return

        }
    })
}

Rating.findById = (idRestaurant, idUser, result) => {

    db.con.query("SELECT * FROM Rating_Restaurante WHERE idRestaurante = ? AND idCliente = ? AND ativo = 1", [idRestaurant, idUser], (err, res) => {
        if (err) {

            console.log("Error:", err)
            return result(err, null)
        } else if (!res[0]) {
            return result({ kind: "not_found" }, null)
        }
        else {
            return result(null, res)
        }
    })
}


Rating.findByUser = (idUser, result) => {
    db.con.query("SELECT * FROM Rating_Restaurante WHERE idCliente = ? AND ativo = 1", idUser, (err, res) => {
        if (err) {
            console.log("Error:", err)
            return result(err, null)
        } else if (!res[0]) {
            return result({ kind: "not_found" }, null)
        }
        else {
            return result(null, res)
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


Rating.create = (idRestaurant, idUser, result) => {

    db.con.query("INSERT INTO Rating_Restaurante SET idRestaurante = ?, idCliente = ?",
        [idRestaurant, idUser], (err, res) => {

            if (err) {
                console.log("Error:", err)
                return result(err, null)
            }

            else {
                return result(null, res)
            }
        })

}

Rating.update = (idRestaurant, idUser, result) => {
    db.con.query("UPDATE Rating_Restaurante WHERE idRestaurante = ? AND idCliente = ? AND ativo=1",
        [idRestaurant, idUser], (err, res) => {
            if (err) {
                console.log("Error:", err)
                return result(err, null)
            } else if (res.affectedRows == 0) {
                return result({ kind: "not_found" }, null)
            }
            else {
                return result(null, res)
            }
        })
}



Rating.delete = (idRestaurant, idUser, result) => {

    db.con.query("UPDATE Rating_restaurante SET ativo = 0 WHERE idRestaurante = ? AND idCliente = ? AND ativo=1",
        [idRestaurant, idUser], (err, res) => {

            if (err) {

                console.log("Error:", err)
                return result(err, null)

            }
            else if (res.affectedRows == 0) {

                return result({ kind: "not_found" }, null)

            }
            else {
                return result(null, res)
            }
        })
}


Rating.deleteByUser = (idUser, result) => {

    db.con.query("UPDATE Rating_Restaurante SET ativo = 0 WHERE idCliente = ? AND ativo=1",
    idUser, (err, res) => {

            if (err) {

                console.log("Error:", err)
                return result(err, null)

            }
            else if (res.affectedRows == 0) {

                return result({ kind: "not_found" }, null)

            }
            else {
                return result(null, res)
            }
        })
}



module.exports = Rating