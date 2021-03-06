//In this file we will bring combine all model and controllers 
const fs = require('fs');
//fs module to to read directory and include all required controllers and model files
// in main app


const express = require('express');

//In this project we are going to use express library 
//because it has good routing facility and also we can create mini apps using routers
// It also has good Request Response module which same can also be implemented using http module

const bodyParser = require('body-parser');
//In this app we will be getting many body parameters to parse them and use them We have
//Included this module

var app = express();
//initialized express app.
//for monitoring app
app.use(require('morgan')('dev'))


app.use(bodyParser());
//initialized body parser
//intialized in my directory

app.use('/', express.static(__dirname + '/frontend/'));
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true

}))

fs.readdirSync('./app/controllers').forEach(function(file) {
        if (file.indexOf('.js')) {
            var route = require('./app/controllers/' + file);
            route.controllerFunction(app);
        }
    })
    //included all controller files in main app using readdirSync which comes with fs module
    //it reads all files synchronously one by one and includes them using require function

fs.readdirSync('./app/models').forEach(function(file) {
        if (file.indexOf('.js')) {
            require('./app/models/' + file);
        }
    })
    //included all model files in main app using readdirSync which comes with fs module
    //it reads all files synchronously one by one and includes them using require function

app.listen(8000, function() {
    console.log("app server running on port:8000");
})

//resource for learning D3
//visit:http://alignedleft.com/tutorials/d3/adding-elements
