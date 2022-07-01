# Simple todo api.

# Setting up the local server.
1. Install Mongodb. Get a free version from [Mongodb official](https://www.mongodb.com/try/download/community)
2. Create a mongodb connection with the connection string `mongodb://localhost:27017`
3. Clone this repository and run `yarn` or `npm install`

# Routes definition
1. The base route is `/todo`
2. Post a todo route `/todo`. Method = `POST`
3. Get all todos route `/todo`. Method = `GET`
4. Get a todo route `/todo/<id>`. Method = `GET`
5. Delete todo route `/todo/<id>`. Method = `DELETE`
6. Update a todo route `/todo/<id>`. Method = `PATCH`
