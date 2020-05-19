var express = require("express");
var expressSanitized = require("express-sanitize-escape")
var bodyParser = require("body-parser");
var admin = require('firebase-admin');
var serviceAccount = require("./mealset-1579630397236-firebase-adminsdk-qcgpv-dd5a66335d.json")
const {Storage} = require('@google-cloud/storage');

const db = require("../models/db.js");

var app = express();




app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//app.use(expressSanitized.middleware());

/*
// Creates a client
const storage = new Storage({keyFilename:"MealSet-b6ea8bc5fbe6.json"});
// Creates a client from a Google service account key.
// const storage = new Storage({keyFilename: "key.json"});

const bucketName = 'notifications';

async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error);


//expressSanitized.sanitizeParams(app,['idRestaurant', 'idPlate','idTable', 'idComposition'])

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mealset-1579630397236.firebaseio.com"
  });

  */

module.exports= app;


require("../routes/restaurant.js")(app)
require("../routes/plate.js")(app)
require("../routes/table.js")(app)
require("../routes/ingredient.js")(app)
require("../routes/composition.js")(app)
require("../routes/rating.js")(app)
//require("../routes/comment.js")(app)

app.listen(3000,function(){
    console.log("Server running at http://127.0.0:3000/")
})



