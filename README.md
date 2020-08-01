# Livechat's recruitment app

  

## Getting started

  

- install npm dependencies - `npm i`
- install json-server globally - ``npm install -g json-server``
- run the mock server by navigating to ``mocks`` folder and running
 ``json-server --watch mock-server.json`` command in terminal
- run the server - ``nodemon server.js``
  

## Implementation

  
Beside ``server.js`` rest of the code is contained in folder app. It has been divided to 6 sub-folders :

**constants** - It contains all constants used in app, such as anonymous user object and constants used in tests.

**utils** - It contains utils that possibly could be useful elsewere in code. It contains util that removes doubles from array and transforms user data object to .

**tests** - It contains all unit tests that I've prepared for this project. Tests were implemented using ``jest`` and ``supertest`` libraries. To run them use command ``npm test`` in terminal.  Code coverage achived is 100%.

**services** - It contains all services that were used in this project. Each one uses ``axios`` to preform calls. They also uses ``async/await`` way of handling promisses.

**routes** - It contains all routes in this project, as well as ``index.js`` file to make importing more comfortable. In ``chat-routes.js`` you can find the call  that was stated in the task description.

**controllers** - It contains all controllers in this project. All logic used in routes is stored there.
  

## Notes

  

There are few things that are worth mentioning in my opinion:

- I commented most of the code to make it more transparent to the reader. 
- I had a problem with supertest that I could not resolve. My server does not close after test were performed. I tried to solve it but I couldn't. I would like to be open about it, so I've put additional flag to ``npm test`` script that will point out the problem.
- In task description one of fields returned is called ``message_cound`` . I assumed this was mistake so I renamed it as ``message_count``
- In task description point about changing ``user_uuid`` to concatincated first name and last name was not on the same page with exaple response provided. I started implementation in the evening (no way of asking) so i did it both ways. It is commented in code in ``chat-controller.js`` and `remove-doubles-util.js`. 