var express = require('express'),
    route = express.Router(),
    mongoose = require('mongoose');
mongoose.connect('http://localhost/testSystem');
var ObjectId = mongoose.Types.ObjectId;
var Question = require('./../models/Question_model.js');
var testModel = require('./../models/testModel.js')
var isloggedIn = require('./../middlewares/isloggedIn.js');
var userModel = require('./../models/userModel.js')
var scoreModel = require('./../models/scoreModel.js')


exports.controllerFunction = function(app) {
//route to get analytics i.e score tests and attempts
    route.post('/get/test/and/scores/:test_id', function(req, res) {
        var Result = {};

        testModel.findOne({ _id: ObjectId(req.params.test_id) }, function(err, result) {
            if (err) throw err;
            else {
                Result.test = result;
                scoreModel.find({ $and: [{ test_id: ObjectId(req.params.test_id) }, { user_id: ObjectId(req.body.user_id) }] }, function(err, scores) {
                    if (err) throw err;
                    else {
                        Result.scores = scores;
                        res.json(Result)
                    }
                })

            }
        })
    })
    //ROUTE to get test given a particular test -id
    route.get('/test/:id', function(req, res) {
        testModel.find({ _id: ObjectId(req.params.id) }, function(err, result) {
            if (err) throw err;
            else {
                console.log(result)
                res.json(result)
            }
        })

    })

    //route to get user from user_id
    route.get('/:id', function(req, res) {
        userModel.findOne({ _id: ObjectId(req.params.id) }, function(err, result) {
            if (err) throw err;
            else {
                res.json(result.test_attempted)
            }
        })

    })

    //route to get all users from system
    route.get('/', function(req, res) {
        userModel.find({ type: 'user' }, function(err, profiles) {
            if (err) throw err;
            else
                res.json(profiles)
        })

    })
    //route to create test
    route.post('/create_test', function(req, res) {
        var test = new testModel({
            testName: req.body.test_name,
            test_details: req.body.test_details,
            total_questions: req.body.total_questions,
            total_score: req.body.total_score,
            duration_hrs: req.body.time

        })

        test.save(function(error, result) {
            if (error) throw error;
            else {

                res.json(result)
            }
        })
    })
    //route to create questtions for the corresponding supplied test id
    route.post('/create_test/:test_id', function(req, res) {


        var question = new Question({
            test_id: req.params.test_id,
            Question: req.body.Question,
            Option_A: req.body.option_A,
            Option_B: req.body.option_B,
            Option_C: req.body.option_C,
            Option_D: req.body.option_D,
            correct_option: req.body.correct_option


        })

        question.save(function(er, result) {
            if (er) throw er;
            else
                res.json(result)
        })
    })

    app.use('/admin', isloggedIn.checkforAdmin, route)

}
