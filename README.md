All API requests should be made to the base URL: http://localhost:12345/

How to run: there are 2 ways:
1) use npm start on both the server and the react
2) use npm build on the react, copy the build file to the public dir in the server. change app.js in line 15 to use 'public/build'. use npm start on the server and open localhost in the port written
   in the config .env.local file (if there's problems with the port, change to one that works)

User Endpoints:
GET /users/:id
Retrieve the details of a user (name, picture, etc.) by their unique identifier.

PUT/PATCH /users/:id
Update an existing user's details. This operation is only allowed for the user themselves.

DELETE /users/:id
Delete an existing user. This operation is only allowed for the user themselves.

Post Endpoints
GET /users/:id/posts
Fetch the list of posts published by a user. This list is sorted and visible according to the friendship status of the requesting user.

POST /users/:id/posts
Create a new post as a user. The user must be authenticated, and the post will be added to their feed.

PUT/PATCH /users/:id/posts/:pid
Update an existing post. This operation is only allowed for the original author of the post.

DELETE /users/:id/posts/:pid
Delete an existing post. This operation is only allowed for the original author of the post.

Friendship Endpoints
GET /users/:id/friends
Retrieve the list of a user's friends. This endpoint is accessible to the user themselves and their friends.

POST /users/:id/friends
Send a membership (friendship) request. This operation is open to all authenticated users.

PATCH /users/:id/friends/:fid
Approve a membership request. This operation is restricted to the recipient of the friendship request.

DELETE /users/:id/friends/:fid
Remove a friend or cancel a pending friendship request. This operation is available to the user involved in the friendship.


Yedidya's Contribution: 
Yedidia took care of upgrading the users properly, posts functions and adjusting to a the client website.

Yuval's Contribution:
Yuval took care of adjusting the server to Android.

Itamar's Contribution:
Created the base for the server and working with MongoDB, creating users.


