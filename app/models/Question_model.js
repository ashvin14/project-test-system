var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Question = new Schema({
    test_id: { type: mongoose.Schema.Types.ObjectId },
    Question: { type: String },
    Option_A: { type: String },
    Option_B: { type: String},
    Option_C: { type: String },
    Option_D: { type: String },
    correct_option:{type:String}
})

var questions = mongoose.model('questioncollections', Question);
module.exports = questions;
