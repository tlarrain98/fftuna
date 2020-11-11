This project was made with React, Postgres, Express, Node.js, and Auth0.
Currently, this project is only set up to work with ESPN fantasy football leagues.


# To set up for your own league: 


### 1. Create an Auth0 account and application
You can create your Auth0 account and app [here.](https://auth0.com/) After doing this,
create a `.env` file inside the `client` directory. Put these two lines of code in the file:

```
REACT_APP_AUTH0_DOMAIN={Domain}
REACT_APP_AUTH0_CLIENT_ID={Client ID}
```

The two values, `Domain` and `Client ID` can be found on your Auth0 application dashboard.
(Note: remove brackets when pasting in the values)


### 2. Create a database with Postgres
Link to [Postgres.](https://www.postgresql.org/) Follow the download
link and set up your database. After creating your database, create the file `db.js`
and paste the following code into it:

```
const { Pool } = require('pg');

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    post: 
});

module.exports = pool;
```

These are the same values you used to set up the Postgres database.

After setting up the database, in the SQL Shell (psql), login to your database, and copy 
and paste the schema commands found in `server/schema.sql`. If done correctly, the shell
should resond with `CREATE TABLE`.


### 3. Create constants file for ESPN API
Inside the `client/src` directory, create a file `constants.js` and copy the following
code: 

```
export const LEAGUE_ID = 'LEAGUE ID';

// season id
export const SEASON_ID = 'SEASON ID';
```

Replace `LEAGUE ID` and `SEASON ID` with your ESPN league id and the season for which you
would like the project to display (i.e. '2020'). The League ID can be found in the url of
your ESPN league's homepage. It should be a 6 digit number. These two values will allow
us to make calls to the ESPN API.


# Database Schema
The database schema can be found at `server/schema.sql`.


# To run the project:
Navigate into the `client` directory and in your shell, run the command:

`npm install`

After installation has finished, open a new shell and navigate into the
`server` directory, then run the command:

`npm install`

Once this is complete, go back to the first shell, which should still be
in the `client` directory, and run the command:

`npm start`

As the client side is loading, go back to the other shell,, which should
still be in the `server` directory and run the command:

`npm start` or `npm run devstart` (runs nodemon script)

If done correctly, you should be redirected to localhost:3000, where the
clientside code will be running. The serverside code will be hosted on
localhost:5000.