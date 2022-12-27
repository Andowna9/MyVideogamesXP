const express = require('express');

const Videogame = require('../models/videogame');

const authMiddleware = require('../middleware/authMiddleware');
const listMiddleware = require('../middleware/listMiddleware');

const router = express.Router();


router.use(authMiddleware({allowUnauthenticated: false}))
router.use(listMiddleware());

// Get games
router.get('/my-games/', async (req, res, next) => {
    const userList = req.userList;
    res.json(userList.videogames);
});

// Add new game
router.post('/my-games/', async (req, res, next) => {
    const body = req.body;
    const userList = req.userList;

    // Check if it was already added
    if (userList.videogames.find((videogame) => videogame.igdb_id == body.igdb_id)) {
        return res.sendStatus(409);
    }

    try {
        const videogame = new Videogame({
            igdb_id: body.igdb_id,
            status: body.status,
            progress: body.progress,
            score: body.score,
            note: body.note
        });

        userList.videogames.push(videogame);
        await userList.save();

        res.status(201).json(videogame);
    }
    catch(error) {
        next(error);
    }
});

// Delete specific videogame
router.delete('/my-games/:id', async (req, res, next) => {
    const userList = req.userList;
    try {
        const game = userList.videogames.id(req.params.id);
        game.remove();

        await userList.save();
        res.json(game);
    }
    catch(error) {
        next(error);
    }
});

// Update specific videogame
router.put('/my-games/:id', async (req, res, next) => {
    const body = req.body;
    const userList = req.userList;
    try {
        const game = userList.videogames.id(req.params.id);

        game.status = body.status;
        game.progress = body.progress;
        game.score = body.score;
        game.note = body.note;

        await userList.save();

        res.json(game);
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;