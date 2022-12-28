const List = require('../models/list');

// List retrieval middleware
const listMiddleware = () => {
    return async (req, res, next) => {
        if (req.user) {
            let userList = await List.findOne({ owner_id: req.user });
            if (!userList) {
                const list = new List({
                    owner_id: req.user,
                    videogames: []
                });
                userList = await list.save();
            }
            req.userList = userList;
        }
        next();
    }
}

module.exports = listMiddleware;