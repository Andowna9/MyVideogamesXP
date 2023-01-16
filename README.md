# MyVideogamesXP

**MyVideogamesXP** is a web application that allows users to track their
games progress easily, as well as providing data about a wide variety
of titles by means of [IGDB API](https://www.igdb.com/api) owned by Twitch.

## Configuring enviroment variables

Make sure to create and update the necessary .env files for each backend. The repo contains sample .env files and these include, among others:
- Google Oauth credentials. [Check](https://developers.google.com/workspace/guides/create-credentials)
- IGDB API credentials (Twitch Oauth). [Check](https://api-docs.igdb.com/#about)

## Running locally

### Requirements
- Docker
- Docker Compose
- Npm (Optional)

### Starting app

Simply execute the following command and Docker will take care of the rest:

```
docker compose --profile frontend up -d
```

Enabling the *frontend* profile is important in case you want to access the web frontend at `http://locahost:3000` without extra steps.
To stop it, make sure to include the frontend profile again:

```
docker compose --profile frontend down
```

Otherwise, it is more intuitive and comfortable during development to run the React.js development server directly in your machine:

```
docker compose up -d
cd frontend
npm i
npm start
```

In this last case Docker will start just the backend, so no profile is required.
