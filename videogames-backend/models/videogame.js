const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideogameSchema = new Schema({
    igdb_id: { type: Number, required: true },
    status: {
        type: String, 
        required: true,
        enum: ['On Hold', 'Playing', 'Completed', 'Dropped'],
        default: 'On Hold'
    },
    progress: { 
        type: Number, 
        min: 0, 
        max: 100
    },
    score: {
        type: Number,
        min: 0,
        max: 10
    },
    note: {
        type: String,
        maxLength: 20
    }
});

module.exports = mongoose.model('Videogame', VideogameSchema)