# Authentication
Notes on authentication - how to think about it and what options are available

## What is it?
Authentication is the process of verifying that a user is who he/she says she is (note that this is different than authorization which determines if a user is allowed to access a resource). 

## Best practice
Current best practice - use JWT (https://jwt.io/introduction/) 
Try to use an existing framework. Do not make your own authentication scheme - it is harder than you think. 
For front end use this NPM https://www.npmjs.com/package/jsonwebtoken (`npm install --save jsonwebtoken`)

## Authentication overview
### Basic flow
1) Enter your credentials (username or email and password)
2) Make HTTPS request containing this data to backend 
3) Check that username and password match
4) Return user id and any other data and store token in LocalStorage

### LocalStorage
About LocalStorage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
Tokens stored in LocalStorage are DOMAIN SPECIFIC - that means "stuff" stored in LocalStorage for Facebook.com is not visible to Google.com
The token will remain in storage (not the user profile)

### Backend endpoints required
1) /your_app/auth/email - first request to get token
2) /your_app/auth/renew  - subsequent requests to update token 

Using bcrypt (encryption to store your passwords securely in database) 
https://www.npmjs.com/package/bcrypt-nodejs

Encoding and decoding JWTs 
https://github.com/auth0/node-jsonwebtoken

Storing JWT web toekns 
https://github.com/grevory/angular-local-storage


### Implementation
NOTE that every request to your app MUST be authenticated - how do we do this? 
Include the token in headers of every request (more info about headers - http://stackoverflow.com/questions/1268673/set-a-request-header-in-javascript)
Check that the token is valid on every request
If the token is valid allow the request (return status code 200)
If the token is not valid - do not allow the request to continue and return the appropriate response code (on the front end redirect the user to the login page so that they can try again)

### Other resources
http://www.restapitutorial.com/httpstatuscodes.html
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
http://stackoverflow.com/questions/1268673/set-a-request-header-in-javascript
