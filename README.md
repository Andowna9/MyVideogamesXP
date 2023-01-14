# MyVideogamesXP

**MyVideogamesXP** is a web application that allows users to track their
games progress easily, as well as providing data about a wide variety
of titles by means of [IGDB API](https://www.igdb.com/api) provided by Twitch.

## Configuring enviroment variables

Make sure to create and update the necessary .env files for each container. The repo contains sample .env files and these include, among others:
- Google Oauth credentials. [Check](https://developers.google.com/workspace/guides/create-credentials)
- IGDB API credentials. [Check](https://api-docs.igdb.com/#about)

## Running locally

### Requirements
- Docker
- Docker Compose
- Npm (Optional)

### Starting app

Simply execute the following command and Docker will take care of the rest:

```
docker compose up --profile frontend up -d
```
Enabling the *frontend* profile is important in case you want to access the web frontend at `http://locahost:3000` without extra steps.

Otherwise, it is more intuitive and confortable during development to run the React.js development server directly in your machine:

```
docker compose up -d
cd frontend
npm i
npm start
```
