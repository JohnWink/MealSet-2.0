const db = require("./db")

const Comment = function(ingredient){
    this.nome = ingredient.name
};

Ingredient.getAll = result =>{
    db.con.query("SELECT * FROM Ingredientes WHERE ativo = 1;",(err,res)=>{
        if(err){
            console.log("Error:", err)
            result(err,null)
        }else if(!res[0]){
            result({kind:"not_found"},null)
        }
        else{
            result(null,res)
        }
    })
}