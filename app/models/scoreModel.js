var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var scoreModel = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId },
    test_id: { type: mongoose.Schema.Types.ObjectId },
    score: { type: Number, default: 0 },
    time_taken:{type:Number},
    
    total_correct_answered: { type: Number, default: 0 },
    previous_score: { type: Number, default: 0 }
})
var score = mongoose.model('scorecollections', scoreModel)
module.exports = score;
