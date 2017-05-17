/**
 * Resources: 
 * http://www.restapitutorial.com/httpstatuscodes.html
 */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');

// Auth library
var authEmail = require('./auth/authEmail').authEmail;
var authEmail2 = require('./auth/authEmail2').authEmail2;
var authToken = require('./auth/authToken').authToken;

// User management library
var userAdd = require('./user/userAdd').userAdd;

// Configuration settings
var config = require('./config/config').config;

// Create a new application.
var app = express();

// Connect to database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // TODO put your database username here
  password: '',  // TODO put your database password here
  database: 'example'
});

connection.connect(function(err) {
  if (err) {
    console.log('Error connecting to database');
  } else {
    console.log('Database is connected - ready for requests');
  }
});

// Use JSON body parser middleware.
app.use(bodyParser.json());

/**
 * Authenticate a user using email address and return an object
 */
app.post('/auth/email', function(request, response) {
  var user = request.body;
  console.log('Received auth request for user: ', user.email);
  if (!user.email || !user.password) {
    sendError(response, 400, 'User not specified');
  } else {
    // Check authentication credentials here
    authEmail(connection, user.email, user.password, function(err, user) {
      if (err) {
        return sendError(response, 403, 'Error authenticating');
      } else {
        response.json(user);
        response.end();
      }
    })
  }
});

/**
 * Authenticate a user using email address and return a JWT
 */
app.post('/auth/email2', function(request, response) {
  var user = request.body;
  console.log('Received auth request for user: ', user.email);
  if (!user.email || !user.password) {
    sendError(response, 400, 'User not specified');
  } else {
    // Check authentication credentials here
    authEmail2(connection, user.email, user.password, function(err, token) {
      if (err) {
        console.log(err);
        return sendError(response, 403, 'Error authenticating');
      } else {
        response.json(token);
        response.end();
      }
    })
  }

})

/**
 * Add a user to the database
 */
app.post('/user/add', function(request, response) {
  var user = request.body;
  console.log('Received request to add user: ', user.email);
  if (!user.email || !user.password) {
    sendError(response, 400, 'Missing credentials');
  } else {
    // Add user to database
    userAdd(connection, user.email, user.password, function(err, user) {
      if (err) {
        // Let's log the error so we can debug
        console.log(err);
        return sendError(response, 400, 'Error adding user')
      } else {
        response.json(user);
        response.end();
      }
    })
  }
});


/**
 * A protected resource in your application example - you MUST have a valid JWT
 * to access
 */
app.get('/api/secret_stuff', function(request, response) {
  var header = request.get('Authorization');
  var token = null;
  if (header && header.split(' ')[0] === 'Bearer') {
    token = header.split(' ')[1];
  }
  var decoded = authToken(token);
  if (decoded) {
    response.send('IF YOU SEE THIS YOU SEE THE SECRET MESSAGE');
    response.end();
  } else {
    sendError(response, 403, 'Authorization required')
  }
});


/**
 * Generic error reporting to client
 * @param {response} response response to requestor 
 * @param {int} code HTTP status code to return to requestor 
 * @param {string} message Short description of error 
 */
function sendError(response, code, message) {
  response.statusCode = code;
  response.json({error: message});
  response.end();
}


// Start the server.
console.log("Listening on port: ", config.port)
app.listen(config.port);
