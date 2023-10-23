
![og](https://github.com/rathna-git/MusiLink/assets/16769143/a4429880-02a2-4d82-b52e-004b30b20e9f)

# MusiLink

A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.

### Don't forget ⭐ the repo!

## Tech Stack

### Frontend: 
JavaScript, React with Hooks, Styled Components
### Backend: 
Nodejs, Express.

Deployed @ Heroku

## Demo

### Login and Profile Page

User login page using Spotify OAuth. On successful login it then displays the user's profile page.

https://github.com/rathna-git/MusiLink/assets/16769143/571b7dff-ba66-4044-94c0-620fd63b03f3



### Top Artists Page 

Displays the top artists the user listened to this month and in the last 6 months and all time.

https://github.com/rathna-git/MusiLink/assets/16769143/955f8095-32c6-4ced-a81b-fc84ab5b0382


### Top Tracks Page

Displays the top artists the user listened to this month and in the last 6 months and all time.

https://github.com/rathna-git/MusiLink/assets/16769143/05f8a44d-e7fe-4a31-a56f-f91417ae0365

### Playlists and Playlist Pages

Display user's playlists and tracks in that playlist. User can sort the tracks based on dancebility, tempo and energy levels.

https://github.com/rathna-git/MusiLink/assets/16769143/d1922939-67aa-45f2-983e-f552fe017b83




## Local Installation & Set Up

1. Register a Spotify App in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add `http://localhost:8888/callback` as a Redirect URI in the app settings

2. Create a `.env` file at the root of the project based on `.env.example` and add your unique `CLIENT_ID` and `CLIENT_SECRET` from the Spotify dashboard

3. Ensure [nvm](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/) are installed globally

4. Install the correct version of Node

    ```shell
    nvm install
    ```

5. Install dependencies

    ```shell
    npm install
    ```

6. Run the React app on <http://localhost:3000> and the Node server on <http://localhost:8888>

    ```shell
    npm start
    ```


## Deploying to Heroku with Git

1. Create a [Heroku](https://www.heroku.com/) app

2. Add your Heroku app as a git remote

    ```shell
    heroku git:remote -a your-app-name
    ```

3. Add `http://your-app-name.herokuapp.com/callback` as a Redirect URI in your Spotify app's settings

4. In your app's **Settings** tab in the Heroku dashboard, add [config vars](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard).

   Based on the values in your `.env` file, the `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, and `FRONTEND_URI` key value pairs. Make sure to replace the `localhost` URLs with your heroku app's URL.

   ```env
   REDIRECT_URI: http://your-app-name.herokuapp.com/callback
   FRONTEND_URI: http://your-app-name.herokuapp.com
   ```

5. Push to Heroku

    ```shell
    git push heroku main
    ```

    
## Credits

Inspired by Spotify Profile page.

## License

Musilink is developed under the [MIT license]






