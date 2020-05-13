const db = require("./db")

const Ingredient = function(ingredient){
    this.nome = ingredient.name
};

Ingredient.getAll = result =>{
    db.con.query("SELECT * FROM Ingredientes;",(err,res)=>{
        if(err){
            console.log("Error:", err)
            result(err,null)
        }else{
            result(null,res)
        }
    })
}

Ingredient.findById = (idIngredient,result) =>{
    db.con.query("SELECT * FROM Ingredientes WHERE nome = ?;", idIngredient,(err,res)=>{
        if(err){
            console.log("Error:",err)
            result(err,null)
        }
        else if(!res[0]){
            result({kind:"not_found"}, null)
        }
        else{
            result(null,res)
        }
    })
}

Ingredient.update =(idIngredient, newId, result) =>{
    db.con.query("UPDATE Ingredientes SET nome = ? WHERE nome = ?;",[newId, idIngredient],(err,res)=>{
        if(err){
            console.log("Error:",err)
            result(err,null)
        }
        else if(res.affectedRows == 0){
            result({kind:"not_found"},null)
        }
        else{
            result(null,"Atualizado com sucesso")
        }
    })
}

Ingredient.create =(newIngredient,result)=>{
    db.con.query("INSERT INTO Ingredientes SET nome = ?;", newIngredient, (err,res)=>{
        if(err){
            console.log("Error:", err)
            result(err,null)
        }
        else{
            result(null,"Criado com sucesso")
        }
    })
}

Ingredient.delete = (idIngredient,result)=>{
    db.con.query("DELETE FROM Ingredientes WHERE nome = ?;", idIngredient, (err,res)=>{
        if(err){
            console.log("Error", err)
            result(err,null)
        }
        else if(res.affectedRows == 0){
            result({kind:"not_found"},null)
        }
        else{
            result(null,"Eliminado Com sucesso")
        }
    })
}

module.exports = Ingredient
