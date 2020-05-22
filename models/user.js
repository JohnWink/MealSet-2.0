const db = require("../db")

const User = function (user){
    this.username = user.username
    this.email = user.email
    this.contacto = user.contacto
    this.avatar = user.avatar
    this.password = user.password
    this.dieta = user.diet
    this.userType = user.userType
    this.idRestaurante = user.idRestaurante
}

User.findById = (idUser,result) =>{
    db.con.query("SELECT username, email, contacto, avatar, password, dieta, userType,idRestaurante FROM User WHERE idUser = ? AND ativo = 1",
    idUser,(err,res)=>{
        if(err){
            console.log("Error:", err)
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

User.findAll = (result) =>{
    db.con.query("SELECT idUser, username,email,contrato,avatar,password,dieta,userType,idRestaurante FROM User WHERE ativo = 1",
    (err,res)=>{
        if(err){
            console.log("Error:", err)
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

module.exports = User

