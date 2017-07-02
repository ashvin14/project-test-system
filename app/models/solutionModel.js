var mongoose = require('mongoose')
var Schema  =  mongoose.Schema;
  
var solution = new Schema({
	test_id:{type: mongoose.Schema.Types.ObjectId},
	Question_id:{type: mongoose.Schema.Types.ObjectId},
	user_id:{type: mongoose.Schema.Types.ObjectId},
	solution:{type:String}
})

var solutions = mongoose.model('solutioncollections',solution);
module.exports = solutions;