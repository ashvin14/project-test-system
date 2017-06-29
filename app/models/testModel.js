var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var testModel = new Schema({
    testName: { type: String },
    total_score: { type: Number, default: 60, required: true },
    total_questions: { type: Number, default: 10 },
    test_details:{type:String},
    duration_hours: { type: Number, default: 1 } //in hrs

})

var tests = mongoose.model('testcollections', testModel)
module.exports = tests;
