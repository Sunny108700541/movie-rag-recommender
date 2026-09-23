// it has all service logic 

const fs = require("fs")
const path = require("path");

const { createMovieData, createMovie, createMovieMatch } = require("./Model/Movie");


function cosineSimilarity(a, b) {

    let dotProduct = 0.0, normA = 0.0, normB = 0.0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    if (normA == 0 || normB == 0) return 0.0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));


}

function sortBySimilarity(matches) {

    return [...matches].sort((a, b) => b.match - a.match);
}

function topKMatches(matches, limit) {

    return matches.slice(0, Math.min(limit, matches.length));
    // return min ele what exist or limit 
}

function findMovie(moviesEmbedding, title) {
    const found = moviesEmbedding.find(
        m => m.title.toLowerCase() == title.toLowerCase()
    );

    if (!found) throw new Error("Movie not Found:" + title);

    return found;
}

async function loadMovies(embeddingModel) {
    const resource = path.join(__dirname, "./data/movies.json");
    const inputStream = fs.readFileSync(resource, "utf-8");

    const movieDataList = JSON.parse(inputStream).map(
        m => createMovieData(m.title, m.description)
    );
    const moviesEmbedding = [];

    for (const movieData of movieDataList) {
        const embedding = await embeddingModel.embed(movieData.description);

        moviesEmbedding.push(
            createMovie(movieData.title, movieData.description, embedding)
        );
    }
    console.log(moviesEmbedding.length + "movies loaded with embeddings.");
    return moviesEmbedding;
}

async function search(embeddingModel, moviesEmbedding, query) {
    const userQueryEmbedding = await embeddingModel.embed(query);

    const matches = moviesEmbedding.map(movie => createMovieMatch(
        movie.title,
        movie.description,
        cosineSimilarity(userQueryEmbedding, movie.embedding)
    ));

    return topKMatches(sortBySimilarity(matches), 3);
}


async function similarMovies(moviesEmbedding, title) {
    const selectedMovie = findMovie(moviesEmbedding, title);

    const matches = moviesEmbedding
        .filter(m => m.title.toLowerCase() !== title.toLowerCase())
        .map(movie => createMovieMatch(
            movie.title,
            movie.description,
            cosineSimilarity(selectedMovie.embedding, movie.embedding)
        ));

    return topKMatches(sortBySimilarity(matches), 3);
}

module.exports = { loadMovies, search, similarMovies };

