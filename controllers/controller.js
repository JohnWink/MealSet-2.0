const db = require("../views/db")


 exports.restaurants = (req,res) =>{

    let txt = ""

    db.con.query('SELECT * FROM Restaurante',function(err,rows){
        if(err){
            console.log(err)
                res.send(err)
        }else{
        

            res.send(rows)

         
        }
    })
}


