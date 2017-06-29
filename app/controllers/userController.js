var express = require('express'),
    route = express.Router(),
    mongoose = require('mongoose');
mongoose.connect('http://localhost/testSystem');
var testModel = require('./../models/testModel.js')
var ObjectId = mongoose.Types.ObjectId;
var io = require('socket.io')

var scoreModel = require('./../models/scoreModel.js');
var http = require('http');
var isloggedIn = require('./../middlewares/isloggedIn.js')




exports.controllerFunction = function(app) {
    var server = http.createServer(app)
    var io = require('socket.io').listen(server)
    route.get('/',function(req,res){
        res.json(req.session)
        
    })



    route.post('/attempt_test', function(req, res) {
    	io.on('connection',function(socket){
    		console.log('test has started for '+req.ip)

    		//complete this when doing frontend
    		//make a timer which doesnt restart on  reloading page
    		//make an event to save option sent by user in db
    	})


    })
    


    app.use('/user',isloggedIn.checkforUser, route)

}
