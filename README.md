This project was made with React, Postgres, Express, Node.js, and Auth0.
Currently, this project is only set up to work with ESPN fantasy football leagues.


# To set up for your own league: 


### 1. Create a .env file and an Auth0 account and application
You can create your Auth0 account and app [here.](https://auth0.com/) After doing this, create a `.env` file inside the `/client/` directory. Put these four lines of code in the file:

```
REACT_APP_AUTH0_DOMAIN={Domain}
REACT_APP_AUTH0_CLIENT_ID={Client ID}

REACT_APP_AUTH0_LEAGUE_ID={League ID}
REACT_APP_AUTH0_SEASON_ID={Season ID}
```

The two values, `{Domain}` and `{Client ID}` can be found on your Auth0 application dashboard. (Note: remove brackets when pasting in the values)

Replace `{League ID}` and `{Season ID}` with your ESPN league id and the season for which you would like the project to display (i.e. '2020'). The League ID can be found in the url of your ESPN league's homepage. It should be a 6 digit number. These two values will allow us to make calls to the ESPN API.


### 2. Create a database with Postgres
Link to [Postgres.](https://www.postgresql.org/) Follow the download link and set up your database. After creating your database, create the file `db.js` in the `/server/main/` directory and paste the following code into it:

```
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    post: process.env.DB_POST
});

module.exports = pool;
```


### 3. Create .env file for db.js
Inside the `/server/` directory, create a .env file and fill it with the following values:

```
DB_USER={username}
DB_HOST={host}
DB_NAME={database name}
DB_PASS={password}
DB_POST={post}
```


Replace the bracketed variables with the same values you used to set up the Postgres database.

After setting up the database, in the SQL Shell (psql), login to your database, and copy and paste the schema commands found in `/server/schema.sql`. If done correctly, the shell should respond with `CREATE TABLE`.


### 4. Create constants file for ESPN API
Inside the `/client/src` directory, create a file `constants.js` and copy the following code: 

```
// espn league id
export const LEAGUE_ID = process.env.REACT_APP_LEAGUE_ID;

// season id
export const SEASON_ID = process.env.REACT_APP_SEASON_ID;
```


# Database Schema
The database schema can be found at `server/schema.sql`. Make sure that the foreign keys for `users.username` cascade update, otherwise it won't be possible to change the username.


# To run the project:
Navigate into the `client` directory and in your shell, run the command:

`npm install`

After installation has finished, open a new shell and navigate into the `/server` directory, then run the command:

`npm install`

Once this is complete, go back to the first shell, which should still be in the `client` directory, and run the command:

`npm start`

As the client side is loading, go back to the other shell,, which should still be in the `server` directory and run the command:

`npm start` or `npm run devstart` (runs nodemon script)

If done correctly, you should be redirected to localhost:3000, where the clientside code will be running. The serverside code will be hosted on localhost:5000.