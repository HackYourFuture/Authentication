/**
 * Resources:
 */

var bcrypt = require('bcrypt');

/**
 * Add a user to the database using email and password
 * @param connection {connection} MySQL database connection object
 * @param email {string} email of user to add
 * @param password {string} plaintext of new user password
 * @todo validaate email format
 * @todo better error handling
 */
function userAdd(connection, email, password, callback) {
  if (email && password) {
    var hash = bcrypt.hashSync(password, 10);
    connection.query(
        'insert into user (email, password) values(?,?)', [email, hash],
        function(err, results) {
          if (err) {
            return callback(err);
          } else {
            if (results.length == 0) {
              return callback();
            }
            callback(
                null, {id: results.insertId.toString(), email: email});
          }
        });
  }
}

module.exports.userAdd = userAdd;
