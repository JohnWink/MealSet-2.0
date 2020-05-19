const db = require("./db")

const Reservation = function(reservation){
    this.idCliente = revervation.idClient
    this.idMesa = reservation.idTable
    this.horario = reservation.time
    this.nome = reservation.name
    this.n_pessoas = reservation.n_people
    this.confirmado = reservation.confirmed
}



Reservation.findById = (idReservation,result) =>{
    db.con.query("SELECT * FROM Reserva WHERE idReserva = ? AND ativo = 1", idReservation,(err,res)=>{
        if(err){
            console.log("error:", err)
            return result(err,null)
        }
        else if(!res[0]){
            return result({kind:"not_found"},null)
        }
        else{
            return result(null,res)
        }
    })
}

Reservation.findByRestaurant = (idRestaurant,result)=>{
    db.con.query("SELECT Reserva.* FROM Reserva INNER JOIN Mesa ON Reserva.idMesa = Mesa.idMesa WHERE Mesa.idRestaurante = ? GROUP BY Reserva.idReserva",
    idRestaurant,(err,res)=>{
        if(err){
            console.log("error:", err)
            return result(err,null)
        }
        else if(!res[0]){
            return result({kind:"not_found"},null)
        }
        else{
            return result(null,res)
        }
    })
}

Reservation.findByUser = (idUser,result)=>{
    db.con.query("SELECT * FROM Reserva WHERE idCliente = ?",idUser,(err,res)=>{
        if(err){
            console.log("error:", err)
            return result(err,null)
        }
        else if(!res[0]){
            return result({kind:"not_found"},null)
        }
        else{
            return result(null,res)
        }
    })
}

Reservation.create = (newReservation,result)=>{
    db.con.query("INSERT INTO Reservation SET = ? ",newReservation,(err,res)=>{
        if(err){
            console.log("error:", err)
            return result(err,null)
        }
        else{
            return result(null,res)
        }
    })
}

