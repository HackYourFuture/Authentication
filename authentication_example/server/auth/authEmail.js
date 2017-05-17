/** 
 * Resources:
 * https://codahale.com/how-to-safely-store-a-password/
 * https://www.npmjs.com/package/bcrypt#usage
 */

var bcrypt = require('bcrypt');
/**
 * Authenticate a user using email address
 * @param connection {connection} MySQL database connection object 
 * @param email {string} email of user attempting to authenticate
 * @param password {string} hashed password of user attempting to authenticate
 */
function authEmail(connection, email, password, callback) {
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
            console.log(user);
            if (!bcrypt.compareSync(password, user.password)) {
              return callback();
            }

            callback(null, {
              id: user.id.toString(),
              email: user.email
            });
          }
        });
  }
}

module.exports.authEmail = authEmail;
