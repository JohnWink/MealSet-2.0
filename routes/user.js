module.exports = app =>{

    const user = require("../controllers/user.js");
    
    app.get('/users/:idUser',user.findById);

    app.get('/users', user.findAll);

    app.post('/login',user.login);

    app.post('/signUp',user.signUp);

    app.put('/users/:idUser',user.update);

    app.delete('/users/:idUser',user.delete);

}