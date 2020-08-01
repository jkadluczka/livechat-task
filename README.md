# Livechat's recruitment app

  

## Getting started

  

- install npm dependencies - `npm i`
- install json-server globally - ``npm install -g json-server``
- run the mock server by navigating to ``mocks`` folder and running
 ``json-server --watch mock-server.json`` command in terminal
- run the server - ``nodemon server.js``
  

 ## General description
App is using mocked server to perform merge of two calls into one, containing transformed data.  

**Data received from calls :**

/message:
```
[  
{  
"message_uuid": "3b777c22-5f7d-4552-8294-7363c68f6682",  
"chat_uuid": "802e9b88-60f2-43a1-b8b9-bad33afb0f7b",  
"author_uuid": "ba405586-3a7f-484b-b5c0-5d1cf5cd9c0e",  
"text": "Hi!"  
},  
{  
"message_uuid": "ed557979-5007-4d2c-a3ab-1d58b5603b83",  
"chat_uuid": "c4ad5026-b85c-45fa-8670-82af54623aab",  
"author_uuid": "ce0d0300-716b-4ba8-8f2f-d01d1c2576a4",  
"text": "See you later!"  
},  
{  
"message_uuid": "c358e40f-ab91-4fcb-a779-5096416cc811",  
"chat_uuid": "802e9b88-60f2-43a1-b8b9-bad33afb0f7b",  
"author_uuid": "ba405586-3a7f-484b-b5c0-5d1cf5cd9c0e",  
"text": "How's going?"  
},  
{  
"message_uuid": "2203b590-705e-46c5-9b7d-698c67ecfaa4",  
"chat_uuid": "802e9b88-60f2-43a1-b8b9-bad33afb0f7b",  
"author_uuid": "3017eb96-a211-417b-ab96-6d7286cc0d5c",  
"text": "Hey, very well!"  
}  
]
```

users/?user_uuid=${user_uuid}:
```
{  
"user_uuid": "",  
"first_name": "John",  
"last_name": "Doe"  
}
```

**Data returned from calls**
/chats:
```
[  
{  
"chat_uuid": "66019eab-d2cb-4bb6-a873-aa8acf2d116d",  
"messages_cound": 6,  
"users": [  
"Anonymous",  
"John Doe",  
"Will Smith"  
]  
}  
]
```

**Task basic principles:**
- group all messages based on the `chat_uuid`  
- count all messages for given `chat_uuid` and return as `messages_count`  
- all authors of messages for given `chat_uuid` should be collected and returned as `users` array  
- authors uuids should be replaced with concatenation of first and last name  
- in case when given author doesn't exist (API returned 404), then use name `Anonymous`

**Solution contains:**
-  simple service in nodejs that will meet enlisted goals  
-  tests for created service


## Implementation

  
Beside ``server.js`` , which contains basic logic for starting server on port 8000, rest of the code is contained in folder app. It has been divided to 6 sub-folders :

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