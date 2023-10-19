const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const querystring = require('querystring'); //Built in node module to parse and stringify query strings
const { error } = require('console');

require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

const PORT = process.env.PORT || 8888;
const stateKey = 'spotify_auth_state'; 


// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
// This func is to protect against cross-site request forgery
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

/* ROUTES */

app.get('/', (req,res) => {
    const data = {
        name: 'Rathna',
        isAwesome: true
      };
    
      res.json(data);
});

//Request auth to access data from spotify
app.get('/login', (req,res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = ['user-read-private', 'user-read-email', 'user-top-read',].join(' '); //list of spotify's pre-defined auth scopes.
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state,
        scope,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//use Auth code to request access token, spotify confirms validity of auth code, then responds with access token and refresh token
app.get('/callback', (req,res) => {
    const code = req.query.code || null; //store the value of our authorization code which we got from the code query param in the code variable.

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
        }),
        headers:{
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => { //spotify web api confirms validity of access token, then responds with the requested data
        if(response.status === 200){
            const {access_token, refresh_token, expires_in} = response.data;

            const queryParams = querystring.stringify({
                access_token,
                refresh_token,
                expires_in,
            });
            res.redirect(`${FRONTEND_URI}/?${queryParams}`); //redirects to localhost:3000
        } else {
            res.redirect(`/?${querystring.stringify({error: 'invalid_token'})}`);
        }
    })
    .catch(error => {
        res.send(error);
    });
});


/* Route handler to handle requesting a new access token with our refresh token behind the scenes */
app.get('/refresh_token', (req,res) => {
    const {refresh_token} = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
});

app.get('/awesome-generator', (req, res) => {
    const { name, isAwesome } = req.query;
    res.send(`${name} is ${JSON.parse(isAwesome) ? 'really' : 'not'} awesome`);
  });

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});