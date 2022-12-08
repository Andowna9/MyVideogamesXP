const { app_secret } = require('../config');
const express = require('express');
const jwt = require('jsonwebtoken');

const List = require('../models/list');
const Videogame = require('../models/videogame');

const router = express.Router();

// User authentication middleware
router.use((req, res, next) => {
    const authToken = req.cookies['session'];
    if (authToken == null) return res.sendStatus(401);

    jwt.verify(authToken, app_secret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = decoded['user_id'];
        next();
    });
});

// List retrieval middleware
router.use(async (req, res, next) => {
    let userList = await List.findOne({ owner_id: req.user });
    if (userList == null) {
        const list = new List({
            owner_id: req.user,
            videogames: []
        });
        userList = await list.save();
    }

    req.userList = userList;
    next();
});

// Get games
router.get('/my-games/', async (req, res, next) => {
    const userList = req.userList;
    res.json(userList.videogames);
});

// Add new game
router.post('/my-games/', async (req, res, next) => {
    const body = req.body;
    const userList = req.userList;
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
router.put('/my-games/:id', async (req, res) => {
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