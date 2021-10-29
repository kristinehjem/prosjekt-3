const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: String,
  rank: String,
  title: String,
  year: String,
  image: String,
  imdbRating: String,
  imdbRatingCount: String,
});

movieSchema.plugin(mongoosePaginate);
//tror kanskje ikke det er posts som skal stå der
module.exports = mongoose.model("posts", movieSchema);
