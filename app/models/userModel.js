var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//test will have seperate schema with embedded document as Score

var userModel = new Schema({
    name: { type: String },
    emailId: { type: String },

    password: { type: String },
    type: { type: String, default: 'user' },
    phone_no: { type: Number },
    test_attempted: [{ type: mongoose.Schema.Types.ObjectId ,default:[]}]


})
var users = mongoose.model('usercollections', userModel)
module.exports = users;
