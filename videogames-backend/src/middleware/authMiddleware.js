const jwt = require('jsonwebtoken');
const { app_secret } = require('../config');

// User authentication middleware
const authMiddleware = ({allowUnauthenticated = false}) => {
    return (req, res, next) => {
        const authToken = req.cookies['session'];
        if (authToken) {
            jwt.verify(authToken, app_secret, (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(403);
                }
                req.user = decoded['user_id'];
            });
        }
        else if (!allowUnauthenticated) {
            return res.sendStatus(401);
        }

        next();
    }
}

module.exports = authMiddleware;