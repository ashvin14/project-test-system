var express = require('express'),
    route = express.Router(),
    mongoose = require('mongoose');
mongoose.connect('http://localhost/testSystem');
var testModel = require('./../models/testModel.js')
var ObjectId = mongoose.Types.ObjectId;
var QuestionModel = require('./../models/Question_model.js')
var scoreModel = require('./../models/scoreModel.js');
var userModel = require('./../models/userModel.js')
var isloggedIn = require('./../middlewares/isloggedIn.js')
var _socket = null;
var solutionModel = require('./../models/solutionModel.js')




exports.controllerFunction = function(app) {
    var http = require('http')
    var server = http.createServer(app)
    var io = require('socket.io').listen(server)

    //route to take test for User
    route.get('/take_test', function(req, res) {

        testModel.find({}, function(er, result) {
            if (er) throw er;
            else
                res.json(result)
        })

    })
    var dummyTime;
    var time;
    var userName
    //route to get details for graph like test taken ,scores and no.of attempts
    route.get('/get/test/and/scores/:test_id', function(req, res) {
        var Result={};
        
        testModel.findOne({ _id: ObjectId(req.params.test_id) }, function(err, result) {
            if (err) throw err;
            else {
                Result.test = result;
                scoreModel.find({ $and: [{ test_id: ObjectId(req.params.test_id) }, { user_id: ObjectId(req.session.user._id) }] }, function(err, scores) {
                    if (err) throw err;
                    else {
                        Result.scores = scores;
                        res.json(Result)
                    }
                })

            }
        })
    })
    //route to get all user-test-attempted
    route.get('/', function(req, res) {

        userModel.findOne({ _id: ObjectId(req.session.user._id) }, function(err, result) {
            if (err) throw err;
            else {
                res.json(result.test_attempted)
            }
        })
    })

    route.get('/:id', function(req, res) {
        testModel.find({ _id: ObjectId(req.params.id) }, function(err, result) {
            if (err) throw err;
            else {
                
                res.json(result)
            }
        })
    })
    //it is basically used to initaite socket.io and assign time and nothing much
    route.get('/take_test/:id', function(req, res) {
        userModel.findOneAndUpdate({ _id: ObjectId(req.session.user._id) }, { $push: { test_attempted: ObjectId(req.params.id) } }, function(err, result) {
            if (err) throw err;
            
        })

        server.listen(8080, function() {
            console.log('socket app started on port:8080')
        })
        userName = req.session.user.name;
        testModel.findOne({ _id: ObjectId(req.params.id) }, function(er, result) {
            if (er) throw er;
            else {
               
                dummyTime = time = result.duration_hours
            }
            res.json({})
        })


    })
    //socket started this socket will keep track of time and trigger
    //an appropriate event when time is up
    var capture = io.of('/take_test')
    capture.on('connection', function(socket) {
        console.log('socket io connected')
        socket.on('get question', function(id) {
            QuestionModel.find({ test_id: ObjectId(id) }, function(err, result) {
                if (err) throw err;
                else {

                    socket.emit('take question', result)
                }
            })
        })





        time = time * 60 * 60;
        setTimeout(function() {
            console.log('timer stopped')
            socket.emit('stop timer')

        }, time * 1000)
        var i = 0
        var x = setInterval(function() {

            i++;
            socket.emit('time', i)

            if (time == i)
                clearInterval(x)
        }, 1000)


        socket.on('disconnect socket', function() {
            socket.disconnect();


        })
        socket.on('disconnect', function() {
            console.log('disconnected')

        })
    })
    //route to save users solution for particular test
    route.post('/take_test/solution', function(req, res) {

        var solution = new solutionModel({
            test_id: ObjectId(req.body.test_id),
            Question_id: ObjectId(req.body.question_id),
            user_id: ObjectId(req.session.user._id),
            solution: req.body.solution

        })
        solution.save(function(err, result) {
            if (err) throw err;
            else
                res.json(result)
        })
    })
    //route to post a scorecard based on users performance
    route.post('/scorecard/', function(req, res) {
        var scorePerQuestion;
       
        testModel.find({ _id: ObjectId(req.body.id) }, function(err, result) {
            if (err) throw err;
            else {

                scorePerQuestion = result[0].total_score / result[0].total_questions;

            }

        })



        QuestionModel.find({ test_id: ObjectId(req.body.id) }, function(err, question) {
            var totalCorrectAnswered = 0;

            question.forEach(function(question) {
                
                req.body.solution.forEach(function(sol) {

                    if (sol.question_id == question._id) {
                        if (sol.solution == question.correct_option) {
                            totalCorrectAnswered++;
                        }
                    }

                })

            })

            var score = new scoreModel({
                test_id: ObjectId(req.body.id),
                user_id: ObjectId(req.session.user._id),
                score: scorePerQuestion * totalCorrectAnswered,
                total_correct_answered: totalCorrectAnswered++,
                time_taken: req.body.time

            })

            score.save(function(err, result) {
                res.json(result)
            })

        })




    })
    //route to get the scorecard for test
    route.get('/scorecard/:id', function(req, res) {
        var Result = {}
        testModel.find({ _id: ObjectId(req.params.id) }, function(err, result) {
            if (err) throw err;
            else
                Result = result;
        })
        scoreModel.find({ $and: [{ test_id: ObjectId(req.params.id) }, { user_id: ObjectId(req.session.user._id) }] }, function(err, result) {
            res.json({
                'test': Result,
                'score': result
            })
        })
    })





    app.use('/user', isloggedIn.checkforUser, route)

}
