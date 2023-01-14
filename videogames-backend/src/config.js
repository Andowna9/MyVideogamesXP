const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT || 5000,
    app_secret: process.env.APP_SECRET,
    mongodb_uri: process.env.MONGODB_URI,
    twitch_oauth_client_id: process.env.TWITCH_OAUTH_CLIENT_ID,
    twitch_oauth_acess_token: process.env.TWITCH_OAUTH_ACCESS_TOKEN
};