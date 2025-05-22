const express = require('express');
const { twitch_oauth_client_id, twitch_oauth_acess_token } = require('../config');
const igdb = require('igdb-api-node').default;

const authMiddleware = require('../middleware/authMiddleware');
const listMiddleware = require('../middleware/listMiddleware');

const apiClient = igdb(twitch_oauth_client_id, twitch_oauth_acess_token);
const router = express.Router();

// Sizes: https://api-docs.igdb.com/#images
sizes = {
    small: 'cover_big',
    big: '720p'
}
const processCover = (games, size) => {
    games.forEach(game => {
        if (!game['cover']) return;
        
        const hash = game['cover'].image_id;
        delete game['cover'];
        game['cover_image'] = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`;
    });
}

// Search
router.get('/search', async (req, res, next) => {
    const searchText = req.query.search;
    if (!searchText) return res.sendStatus(400);
    
    try {
        const apiResponse = await apiClient.search(searchText)
            .fields(['id', 'name', 'cover.image_id'])
            .limit(10)
            .request('/games');

        processCover(apiResponse.data, sizes.big);
        res.send(apiResponse.data);
    }
    catch(error) {
        next(error);
    }
    
});

// Get specific videogame
router.get('/:id', authMiddleware({allowUnauthenticated: true}), listMiddleware(), async (req, res, next) => {
    const id = req.params.id;
    const userList = req.userList;
    const coverSize = req.query.cover_size || 'big';

    try {
        const apiResponse = await apiClient
            .fields(['id', 'name', 'first_release_date', 'genres.name', 
                    'storyline', 'summary', 'platforms.name', 'rating', 'cover.image_id'])
            .where(`id = ${id}`)
            .request('/games');

        processCover(apiResponse.data, sizes[coverSize]);

        const data = apiResponse.data[0];
        data['inList'] = false;
        if (userList) {
            if (userList.videogames.find((videogame) => videogame.igdb_id == data.id)) {
                data['inList'] = true;
            }
        } 
        res.send(data);
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;