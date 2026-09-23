const { title } = require("process");
const movieService = require("./MovieService");

function createMovieController(embeddingModel, moviesEmbedding) {

    return {

        search: (query) => movieService.search(embeddingModel, moviesEmbedding, query),
        similarMovies: (title) => movieService.similarMovies(moviesEmbedding, title)
    };
}

module.exports = { createMovieController };