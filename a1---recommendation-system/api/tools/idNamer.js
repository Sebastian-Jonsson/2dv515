const dataReader = require('./dataReader')

const idNamer = {}

idNamer.movieId = async (totalScores) => {
    let moviesList = await dataReader.getMoviesList()
    let namedTotalScores = []

    for (let i = 0; i < totalScores.length; i++) {
        moviesList.forEach(movie => {
            if (movie.MovieId === totalScores[i].MovieId) {
                namedTotalScores.push({
                    Title: movie.Title,
                    MovieId: movie.MovieId,
                    TotalScore: totalScores[i].TotalScore
                })
            }
        })
    }

    return namedTotalScores
}

idNamer.userId = async (user) => {
    return "Not implemented"
}


module.exports = idNamer