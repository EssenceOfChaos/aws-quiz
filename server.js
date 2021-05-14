// get Env vars
require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./server/config/db');
const logger = require('./server/config/logger');
const quizRoute = require('./server/routes/quiz.route')

if (process.env.NODE_ENV == 'development') {
  logger.info("Node is starting in DEVELOPMENT mode.");
}
else if (process.env.NODE_ENV == 'production') {
  console.log('Node is starting in PRODUCTION mode.')
}


// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected sucessfully ')
},
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express
const app = express();

// Middleware
app.use(function (req, res, next) {
  logger.info(`${req.method} - ${req.url}`);
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(express.static(path.join(__dirname, 'dist/aws-quiz')));

app.use('/api', quizRoute)

// Create port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  logger.error(`${req.url} not available!`)
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = server;
