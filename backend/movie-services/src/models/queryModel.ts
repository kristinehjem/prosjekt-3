const mongoose = require("mongoose");
const FetchMoviesSchema = new mongoose.Schema({Object});

const FetchMovies = mongoose.model('posts', FetchMoviesSchema)
module.exports = FetchMovies;

