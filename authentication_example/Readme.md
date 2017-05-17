
# Authentication example

*Please read this before you try the example.*

## Prerequisites
You will need mysql installed locally on your machine

## Code structure
The code is intentionally not strucutred in the best way so that you can see how the pieces fit together better. I encourage you to read a few articles to understand what best practice looks like so you can structure your own code better in the future.

Here are a few links:

* https://www.terlici.com/2014/08/25/best-practices-express-structure.html
* https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/
* http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application

And a good style guide for JavaScript from AirBnB:
* https://github.com/airbnb/javascript

and the good folks at Google:
* https://google.github.io/styleguide/jsguide.html

*REMEMBER - THE STYLE YOU CHOOSE IS LESS IMPORTANT THAN BEING CONSISTENT!!!*

## Getting started
1. Go to the `mysql` directory of this repo wherever you cloned it on your machine. E.g. `cd c:\timir\projects\authentication_example\mysql`

1. Start your mysql client in a terminal window. On my machine this is `mysql -u root -p` and enter the root password.

1. When you have the `mysql>` prompt type `source ./schema.sql` and the database and tables will be built for you. They are very simple. Look in the `schema.sql` file to make sure you understand what is happening.

1. `exit` the mysql command prompt

1. Go back to the root directory (`authentication_example`) and get the packages you need by running `npm install`.

1. Add your database credentials in `server.js`, lines 27-30.

1. If there is no error from `npm install` you should be ready to start the server by typing `npm start`

1. The server will tell you it is running and ready for connections

1. Open Postman. You will create three requests. Make sure you have selected `raw` and `JSON` for the content type.

1. Add a user -  POST the JSON below in the request body to `localhost:8080/user/add`<br>
`{ "email": "tkaria@gmail.com", "password": "foobar" }`<br>
and press `Send`

1. Try to authenticate - create a new POST the same JSON as above to the endpoint `localhost:8080/auth/email`. You should get your `user_id` and `email` back.
<br>DO NOT WRITE YOUR END POINT LIKE THIS - I just wanted to show you basic mechanism for authentication without all the encryption and tokens. Instead, use the implementation as explained next.

1. Get a token - make another POST the same JSON as above to the endpoint `localhost:8080/auth/email2`. You will get back a token and a message. Copy the token text without the quotes.

1. Create a new GET request. You will try to access a resource (stuff on the server) that requires authentication and you will supply the token to prove your identity. The endpoint for the GET request is `localhost:8080/api/secret_stuff`.
<br>Press `Send` ... IT FAILS! Why? You didn't supply the token in the header yet. To fix this choose the Headers tab and add a key named `Authorization` and paste the token in the value field. Press `Send` again and it should work.

1. The token is set to expire after 5 minutes (this is set in the config file) so wait 5 minutes and try again and you should get a failure.

1. Just for fun, visit [jwt.io](https://jwt.io/) and paste in the `jwt` obtained earlier and examine its contents.

## Todo
* Add example using auth0

