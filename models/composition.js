const db = require("./db")

const Composition = function(composition){
    this.ingrediente = composition.ingredient
    this.quantidade = composition.quantity
    this.medida = composition.measurement
}

Composition.getAll = (result) =>{
    db.con.query("SELECT * FROM Composição", (err,res)=>{
        if(err){
            console.log("Error:", err)
            result(err,null)
        }
        else if(res[0]==0){
            result({kind:"not_found"},null)
        }
        else{
            result(null,res)
        }
    })
}