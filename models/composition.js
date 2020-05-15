const db = require("./db")

const Composition = function (composition) {
    this.ingrediente = composition.ingredient
    this.quantidade = composition.quantity
    this.medida = composition.measurement
}

Composition.getAll = (idPlate,result) => {

    db.con.query('SELECT Composição.* FROM Composição INNER JOIN Prato_Composição ON Composição.idComposição = Prato_Composição.idComposição WHERE Prato_Composição.idPrato = ? GROUP BY Composição.idComposição', 
    idPlate,function (err, res) {
        if (err) {
            console.log(err)
            return result(err, null)
            

        }
        else if (!res[0]) {
            return  result({ kind: "not_found" }, null)
        }
        else {

            console.log("Composições: ", res)
            return result(null, res)
            

        }
    })
}

Composition.findById = (idComposition, result) => {

    db.con.query("SELECT * FROM Composição WHERE idComposição = ?", idComposition, (err, res) => {

        if (err) {
            console.log("error:", err)
            return result(err, null)

        }
        // If there's no composition found
        else if (!res[0]) {
            return result({ kind: "not_found" }, null)


        }
        // If there's the found composition
        else {
            return result(null, res[0])

        }
    })

}

Composition.create = (idPlate,newComposition, result) => {
    db.con.query("SELECT * FROM Prato WHERE idPrato = ?", idPlate,(err,res)=>{
        if(err){
            console.log("error:",err)
            return result(err,null)
        }
        else if(!res[0]){
            return result({kind: "not_found"},null)
        }
        else{
             //Preparing to add new composition Database
            db.con.query("INSERT INTO Composição SET ?", newComposition, (err, res) => {
                if (err) {
                    console.log("error:", err)
                    return result(err, null)

                } else {
                    console.log(res[0])
                    db.con.query("INSERT INTO Prato_Composição SET idPrato = ? , idComposição = (SELECT max(idComposição) FROM Composição)",
                     idPlate,(err,res)=>{
                        if(err){
                            console.log("error:", err)
                            return result(err,null)
                        } else{
                            console.log("Composição criada")
                            return result(null, "Composição criada")
                        }
                    })
                  
                }
            })
        }
    })
   


}

Composition.update = (idComposition, compositionInfo, result) => {

    db.con.query("UPDATE Composição SET ingrediente=?, quantidade=?, medida=? WHERE idComposição=? ",
        [compositionInfo.ingrediente, compositionInfo.quantidade, compositionInfo.medida, idComposition],
        (err, res) => {
            if (err) {
                console.log("error:", err);
                return result(err, null)
            }
            //If no row has been affected/changed, an error will occur
            else if (res.affectedRows == 0) {
                return result({ kind: "not_found" }, null)
            } else {
                return result(null, "Composição Atualizada")
            }
        })
}


Composition.delete = (idComposition,result) =>{
    db.con.query("UPDATE Composição SET ativo = 0 WHERE idComposição = ?", idComposition,(err,res)=>{
        if(err){
            console.log("error:", err);
            return result(err,null)
        }
        else if(res.affectedRows == 0){
            return result({kind:"not_found"},null)
        }
        else{
            db.con.query("UPDATE Prato_Composição SET ativo = 0 WHERE idComposição = ?", idComposition,(err,res)=>{
                if(err){
                    console.log("error:", err);
                    return result(err,null)
                }
                else if(res.affectedRows == 0){
                    return result({kind:"not_found"},null)
                }
                else{
                    return result(null,"Composição eliminada")
                }
            })
            
        }
    })
}

Composition.deleteAll = (idPlate,result) =>{
    db.con.query("UPDATE Prato_Composição SET ativo = 0 WHERE idPrato = ?", idPlate, (err,res)=>{
        if(err){
            console.log("error:", err);
            return result(err,null)
        }
        else if(res.affectedRows == 0){
            return result({kind:"not_found"},null)
        }
        else{
            db.con.query("UPDATE Composição INNER JOIN Prato_Composição ON Composição.idComposição = Prato_Composição.idComposição SET Composição.ativo = 0 WHERE Prato_Composição.idPrato = ?;",
            idPlate,(err,res)=>{
                if(err){
                    console.log("error:", err);
                    return result(err,null)
                }
                else if(res.affectedRows == 0){
                    return result({kind:"not_found"},null)
                }
                else{
                    return result(null,"Composição eliminada")
                }
            })
        }
    })
 
}

module.exports = Composition