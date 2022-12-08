const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT || 5000,
    app_secret: process.env.APP_SECRET,
    mongodb_uri: process.env.MONGODB_URI,
    client_id: process.env.CLIENT_ID,
    api_token: process.env.API_TOKEN
};