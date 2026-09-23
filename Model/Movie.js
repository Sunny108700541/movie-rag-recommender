// function create data

function createMovieData(title = null, description = null) {
    return { title, description };
}

// after embedding 
function createMovie(title = null, description = null, embedding = null) {
    return { title, description, embedding };
}

function createMovieMatch(title = null, description = null, match = 0.0) {

    return { title, description, match };
}

module.exports = { createMovieData, createMovie, createMovieMatch }