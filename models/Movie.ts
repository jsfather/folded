import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: String,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
