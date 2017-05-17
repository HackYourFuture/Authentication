/**
 * Resources:
 * https://www.npmjs.com/package/jsonwebtoken
 * https://www.npmjs.com/package/bcrypt#usage
 */
// Configuration parameters
var config = require('../config/config').config;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
/**
 * Authenticate a user using email address and password
 * @param connection {connection} MySQL database connection object
 * @param email {string} email of user attempting to authenticate
 * @param password {string} hashed password of user attempting to authenticate
 * @returns JSON web token (JWT)
 */
function authToken(token) {
  try {
    var decoded = jwt.verify(token, config.JWTKey);
    console.log(decoded)
  } catch (err) {
    console.log(err);
    return;
  }
  return decoded;
}

module.exports.authToken = authToken;
