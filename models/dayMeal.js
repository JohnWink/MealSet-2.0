const db = require("../db")

const DayMeal = function (dayMeal){
    this.Dia = dayMeal.idDayMeal
    this.idPrato = dayMeal.idPlate
}

DayMeal.findByRestaurant = (idRestaurant,result) =>{
    db.con.query("SELECT Menu_do_Dia.Dia, Prato.* FROM Menu_do_Dia INNER JOIN Prato ON Menu_do_Dia.idPrato = Prato.idPrato WHERE Prato.idRestaurante = ? AND Prato.ativo = 1",
    idRestaurant,(err,res)=>{
        if(err){
            console.log("Error", err)
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

DayMeal.findByDay = (idDayMeal,result) =>{
    db.con.query("SELECT Menu_do_Dia.Dia, Prato.* FROM Menu_do_Dia INNER JOIN Prato ON Menu_do_Dia.idPrato = Prato.idPrato WHERE Menu_do_Dia.Dia = ? AND Prato.ativo = 1",
    idDayMeal,(err,res)=>{
        if(err){
            console.log("Error", err)
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

DayMeal.findByPlate = (idPlate,result) =>{
    db.con.query("SELECT Menu_do_Dia.Dia, Prato.* FROM Menu_do_Dia INNER JOIN Prato ON Menu_do_Dia.idPrato = Prato.idPrato WHERE Prato.idPrato = ? AND Prato.ativo = 1",
    idPlate,(err,res)=>{
        if(err){
            console.log("Error", err)
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

DayMeal.create = (idDayMeal,idPlate,result) =>{
    db.con.query("INSERT INTO Menu_do_dia SET dia= ? , idPrato = ?",
    [idDayMeal,idPlate],(err,res)=>{
        if(err){
            console.log("Error", err)
            return result(err,null)
        }
        else{
            return result(null,res)
        }
    })
}

DayMeal.update = (idRestaurant,result) =>{

}

DayMeal.delete = (idRestaurant,result) =>{

}

DayMeal.deleteByRestaurant = (idRestaurant,result) =>{

}

DayMeal.deleteByPlate = (idRestaurant,result) =>{

}



module.exports = DayMeal

