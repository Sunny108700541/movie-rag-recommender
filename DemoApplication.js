const { createEmbeddingModel } = require("./Model/embeddingModel");
const MovieService = require("./MovieService");
const { createMovieController } = require("./MovieController");


async function runDemoApplication() {
    const embeddingModel = await createEmbeddingModel();
    const moviesEmbedding = await MovieService.loadMovies(embeddingModel);
    return createMovieController(embeddingModel, moviesEmbedding);
}


module.exports = { runDemoApplication };

