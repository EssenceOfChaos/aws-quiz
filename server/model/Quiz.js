const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Quiz = new Schema({
  subject: {
    type: String
  },
  score: {
    type: String
  },
  user: {
    type: String
  },
  date: {
    type: Date, default: Date.now
  }
}, {
    collection: 'quizzes'
  })

module.exports = mongoose.model('Quiz', Quiz)
