const express = require('express');
const { client_id, api_token } = require('../config');
const igdb = require('igdb-api-node').default;

const apiClient = igdb(client_id, api_token);
const router = express.Router();

sizes = {
    small: 'cover_small',
    big: 'cover_big'
}
const processCover = (games, size) => {
    games.forEach(game => {
        const hash = game['cover'].image_id;
        delete game['cover'];
        game['cover_image'] = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`;
    });
}

// Search 
router.get('/', async (req, res) => {
    const searchText = req.query.search;
    try {
        const apiResponse = await apiClient.search(searchText)
            .fields(['id', 'name', 'cover.image_id'])
            .limit(10)
            .request('/games');

        processCover(apiResponse.data, sizes.small);
        res.send(apiResponse.data);
    }
    catch(error) {
        next(error);
    }
    
});

// Get specific videogame
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const apiResponse = await apiClient
            .fields(['id', 'name', 'first_release_date', 'genres.name', 
                    'storyline', 'summary', 'platforms.name', 'rating', 'cover.image_id'])
            .where(`id = ${id}`)
            .request('/games');

        processCover(apiResponse.data, sizes.big);
        res.send(apiResponse.data);
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;