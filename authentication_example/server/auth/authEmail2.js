/**
 * Resources:
 * https://codahale.com/how-to-safely-store-a-password/
 * https://www.npmjs.com/package/bcrypt#usage
 */


var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// Configuration parameters
var config = require('../config/config').config;


/**
 * Authenticate a user using email address and RETURNS A JWT token
 * @param connection {connection} MySQL database connection object
 * @param email {string} email of user attempting to authenticate
 * @param password {string} hashed password of user attempting to authenticate
 *
 */
function authEmail2(connection, email, password, callback) {
  if (email && password) {
    connection.query(
        'select id, email, password from user where email = ?', [email],
        function(err, results) {
          if (err) {
            return callback(err);
          } else {
            if (results.length == 0) {
              return callback();
            }
            var user = results[0];
            if (!bcrypt.compareSync(password, user.password)) {
              console.warn('Password mismatch for email: ', email)
              return callback();
            }
            var token = jwt.sign(
                {id: user.id.toString(), email: user.email}, config.JWTKey,
                {expiresIn: config.JWTValidityDuration});
            callback(null, {msg: 'Thanks for getting a token!', token: token});
          }
        })
  }
}

module.exports.authEmail2 = authEmail2;
