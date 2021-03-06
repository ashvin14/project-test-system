/*we will implement login using google and facebook
 *also we will let manual authentication be allowed
 */
const express = require('express');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testSystem');


mongoose.connection.once('open', function(err) {
    if (err) throw err;
    else
        console.log("successfully connected to database!");

})

//initializing router instance of express
const route = express.Router(),
    passport = require('passport'),
    Strategy = require('passport-facebook').Strategy,
    googleStrategy = require('passport-google-oauth2').Strategy,
    cookieParser = require('cookie-parser'),
    userModel = require('./../models/userModel.js'),
    promise = require('bluebird'),
    nodemailer = require('nodemailer'),
    speakeasy = require('speakeasy'),

    http = require('http')








exports.controllerFunction = function(app, io) {





    function functionToGetPhoneNo(email) {
        userModel.find({ emailId: email }, function(error, result) {
            if (error) throw error;
            else
                return result.phone_no
        })

    }
    var admin = {
        name: "admin",
        email: 'yashkrnr2@gmail.com',
        type: 'admin'

    }

    //this funciton checks if the user authenticated by googe or facebook already exists in system or not 
    //if not then it registers it
    function functionToSaveUserInDb(name, email) {



        return new promise(function(resolve, reject) {
            userModel.find({ $and: [{ name: name }, { emailId: email }] }, function(err, result) {
                if (err) throw err;
                else {
                    if (result.length == 0) {
                        var user = new userModel({
                            name: name,
                            emailId: email,
                            type: 'user'
                        })
                        user.save(function(err, user) {
                            if (err) throw err;
                            else
                                resolve(user)
                        })
                    } else {
                        resolve(result)
                    }
                }
            })



        })




    }




    const FACEBOOK_CLIENT_ID = '1397329697018363';
    const FACEBOOOK_CLIENT_SECRET = '3a2c60395a2b753e18a15afed5829e6f';
    const callBackURL_facebook = 'http://www.ashvin.tk/userAuth/login/successful/facebook',
        GOOGLE_CLIENT_ID = '325485910552-e7bjr46ucbkldhl1k44s2v05kf0hb1j2.apps.googleusercontent.com',
        GOOGLE_SECRET_ID = 'EntnfFJ8t6hsjgBjCVWV9uG2',
        callbackURL_google = 'http://www.ashvin.tk/userAuth/login/successful/google'

    //use facebook passport
    passport.use(new Strategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOOK_CLIENT_SECRET,
        callbackURL: callBackURL_facebook,
        profileFields: ['id', 'emails', 'name']

    }, function(accessToken, refreshToken, profile, cb) {

        functionToSaveUserInDb(profile.name.givenName, profile.emails[0].value).then(function(response) {



        })




        return cb(null, profile);
    }))


    passport.use(new googleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET_ID,
        callbackURL: callbackURL_google,
        profileFields: ['id', 'emails', 'name']
    }, function(accessToken, refreshToken, profile, cb) {
        process.nextTick(function() {
            
            functionToSaveUserInDb(profile.name.givenName, profile.emails[0].value).then(function(response) {



            })





            cb(null, profile)
        });
    }))
    app.use(passport.initialize())

    passport.serializeUser(function(user, cb) {

            cb(null, user);
        })
        //here you are telling node that session has ended
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    })


    route.get('/login/facebook', passport.authenticate('facebook'), function(request, response) {

    })
    //after successful facebook authectication it creates a session for it and redirects to main page
    route.get('/login/successful/facebook', passport.authenticate('facebook', { failedRedirect: '/', scope: ['emails'] }), function(req, res) {
        
        userModel.findOne({ $and: [{ name: req.session.passport.user.name.givenName }, { emailId: req.session.passport.user.emails[0].value }] }, function(err, result) {
            if (err) throw err;
            else {
                req.session.user = result;
                
                res.redirect('/#/user')
            }
        })
    })
    route.get('/login/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

     //after successful Google authectication it creates a session for it and redirects to main page
    route.get('/login/successful/google', passport.authenticate('google', { failedRedirect: '/' }), function(req, res) {
       
        userModel.findOne({ $and: [{ name: req.session.passport.user.name.givenName }, { emailId: req.session.passport.user.emails[0].value }] }, function(err, result) {
            if (err) throw err;
            else {
                req.session.user = result;
                
                res.redirect('/#/user')
            }
        })
    })
    //route to login user manually
    route.post('/login', function(request, response) {
        if (request.body.password != undefined && request.body.email != undefined) {

            userModel.find({ $and: [{ emailId: request.body.email }, { password: request.body.password }] }, function(err, result) {
                if (err) throw err;
                else
                if (result.length == 0)
                    response.json({ "status": "user not found" });
                else {

                    if (result[0].type == 'user') {
                        delete result[0].testsTaken;

                        request.session.user = result[0];
                    } else
                        request.session.user = admin;
                    response.json(request.session)


                }
            })
        }
    })
    //route to signup the user
    route.post('/signup', function(req, res) {
        if (req.body.email != undefined && req.body.password != undefined && req.body.name != undefined) {
            var user = new userModel({
                name: req.body.name,
                emailId: req.body.email,
                password: req.body.password,
                phone_no: req.body.phone_no
            })


            user.save(function(error, result) {
                if (error) throw error;
                else
                    res.json(result)
            })
        } else {
            res.send('please donot post empty fields ')
        }
    })
    //forgot password
    route.post('/forgotpassword', function(req, res) {
        userModel.find({ emailId: req.body.email }, function(err, result) {
            if (err) throw err;
            else {
                
                if (result.length == 0) {
                    res.json({ "verified": false })

                } else {
                    code = speakeasy.totp({ secret: 'abc123' })
                    var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'yashkhrnr2@gmail.com',
                            pass: '254347122'
                        }

                    })
                    var mailOptions = {
                        // sender address
                        from: 'Ashvin ✔ <yashkhrnr2@gmail.com>',
                        // list of receivers
                        to: req.body.email,
                        // Subject line
                        subject: 'otp for reset password',

                        // rich text html body
                        html: '<h1>otp code is ' + code + ' </h1>'
                    }
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            throw error;
                        } else {
                            console.log('Message sent: ' + info.response);
                        }
                    });
                    res.json({ "code": code })


                };
            }
        })




    })
    //route to change password
    route.put('/changepassword', function(req, res) {
        if (req.body.password != undefined) {
            userModel.findOneAndUpdate({ emailId: req.body.email }, {
                $set: {
                    password: req.body.password
                }
            }, function(error, result) {
                if (error) throw error;
                else
                    res.json(result)
            })
        }
    })
    //route to loggout
    route.get('/loggout', function(req, res) {
        req.logout();
        delete req.session.user;
        delete req.session.passport;

        res.json({ 'loggout': true });

    })






    app.use('/userAuth', route)


}
