const db = require("./db")

//Constructor
const Restaurant = function (restaurant) {
    this.nome = restaurant.name
    this.descrição = restaurant.description
    this.estacionamento = restaurant.parking
    this.coverFoto = restaurant.foto
    this.gps = restaurant.gpsAddress
    this.morada = restaurant.address
    this.Codigo_postal = restaurant.zipCode

}
// Gets All restaurants from Database
Restaurant.getAll = result => {

    db.con.query('SELECT * FROM Restaurante;', function (err, res) {
        if (err) {
            console.log(err)
            result(err, null)
            return
        } else {

            console.log("Restaurants: ", res)
            result(null, res)
            return

        }
    })
}

// Gets ONE Selected Restaurant from Database
Restaurant.findById = (restaurantId, result) => {

    //Send prepared command to Database
    db.con.query("SELECT * FROM Restaurante WHERE idRestaurante = ?", restaurantId, (err, res) => {

        // If there's any problem with the data retrieval 
        if (err) {
            console.log("error:", err)
            result(err, null)
            return
        }
        // If there's the found Restaurant
        else if (res[0]) {
            result(null, res[0])
            return
        }
        // If there's no restaurant found
        else {
            result({ kind: "not_found" }, null)
            return
        }
    })

}

Restaurant.create = (newRestaurant, result) => {
    //Preparing to add new restaurant Database
    db.con.query("INSERT INTO Restaurante SET ?", newRestaurant, (err, res) => {
        if (err) {
            console.log("error:", err)
            result(err, null)

        } else {
            console.log("Restaurante criado")
            result(null, res)
        }
    })

    return
}

Restaurant.update = (id,restaurantInfo,result) =>{

    db.con.query("UPDATE Restaurante SET nome=?, descrição=?, estacionamento=?, coverFoto=?, gps=?, morada=?, Codigo_postal=? WHERE idRestaurante=? ",
    [restaurantInfo.nome, restaurantInfo.descrição, restaurantInfo.estacionamento, restaurantInfo.coverFoto,restaurantInfo.gps, restaurantInfo.morada,restaurantInfo.Codigo_postal,id],
    (err,res)=>{
        if(err){
            console.log("error:", err);
            result(err,null)
        }
        //If no row has been affected/changed, an error will occur
        else if(res.affectedRows == 0){
            result({kind:"not found"},null)
        }else{
            console.log("updated restaurant: ", {restaurantInfo});
            result(null,{restaurantInfo})
        }
    })
}

Restaurant.delete = (id,result) =>{
    //First we delete all the dishes that belong to the restaurant we're doing to delete. 
    db.con.query("DELETE FROM Prato WHERE idRestaurante = ?",id,(err,res)=>{
        if(err){
            console.log("error:", err);
            result(err,null)
        }
    
        else{
            //Only after all of the plates are deleted, we can perform the delete of the restaurant
            db.con.query("DELETE FROM Restaurante WHERE idRestaurante = ?",id,(err,res)=>{
                if(err){
                    console.log("error:", err);
                    result(err,null)
                }
                else if(res.affectedRows == 0){
                    result({kind:"not found"},null)
                }
                else{
                    console.log("Restaurant deleted")
                    
                }
            })
           
        }
    })
    
}

module.exports = Restaurant