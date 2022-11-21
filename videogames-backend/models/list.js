const mongoose = require('mongoose');
const videogameSchema = require('./videogame').schema;

const Schema = mongoose.Schema;

const VideogameListSchema = new Schema({
    owner_id: { type: String },
    videogames: [videogameSchema]
});

module.exports = mongoose.model('VideogameList', VideogameListSchema);