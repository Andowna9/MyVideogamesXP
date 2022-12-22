const { port, mongodb_uri } = require('./config');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const videogamesRouter = require('./routes/videogames');
const listsRouter = require('./routes/lists');

const app = express();

// Database connection
console.log('Connecting to database...')
mongoose.connect(mongodb_uri)
    .then(() => {
      console.log('MongoDB connection ready!');
    })
    .catch(error => {
      console.log('Error connecting to MongoDB:', error.message)
});

// Middleware
app.use(cookieParser())
app.use(express.json())

const errorLogger = (error, req, res, next) => {
  console.log(error.stack);
  next(error);
}

const errorHandler = (error, req, res, next) => {
  // Mongoose validation error
  if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }

  res.status(500).send("Something went wrong");
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: `unknown endpoint: ${req.url}` });
};

// TODO Handle not allowed methods
const methodNotAllowed = (req, res) => {
  res.status(405).send('Method not allowed');
};

// Routers
app.use('/igdb', videogamesRouter);
app.use('/lists', listsRouter);

// Error handlers
app.use(errorLogger);
app.use(errorHandler);
app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});