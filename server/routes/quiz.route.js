const express = require('express');
// const app = express();
const quizRoute = express.Router();

// Quiz model
let Quiz = require('../model/Quiz');

// Add Quiz
quizRoute.route('/quizzes').post((req, res) => {
  console.log(req.body);
  let quiz = new Quiz(req.body);
  quiz.save()
    .then(quiz => {
      res.status(200).json({ 'quizz': 'quizz added successfully' })
    })
    .catch(err => {
      res.status(400).send("unable to save to database")
    });
});

// Get all quizzes
// quizRoute.get('/quizzes', async (req, res) => {
//   try {
//     const quizzes = await Quiz.find();
//     res.json(quizzes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// Sort by date?? -- WIP
quizRoute.get('/quizzes', (req, res) => {
  Quiz.find({}).sort([['score', 'desc']]).exec(function (err, docs) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    } else {
      res.json(docs);
    }
  });
});

// Get single quiz
quizRoute.route('/quiz/:id').get((req, res) => {
  Quiz.findById(req.params.id, (err, data) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(data);
    }
  })
})

// Update quiz
quizRoute.route('/quiz/:id').put((req, res) => {
  Quiz.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, data) => {
    if (err) {
      return console.error(err)
    } else {
      res.json(data)
      console.log('Quiz successfully updated!')
    }
  })
})

// Delete quiz
quizRoute.route('/quiz/:id').delete((req, res) => {
  Quiz.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return console.error(err);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = quizRoute;
