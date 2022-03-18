const dataReader = require('./dataReader')


const weightedScore = {}

weightedScore.weightedStart = async (userId, simScores) => {
    let moviesList = await dataReader.getMoviesList()
    let ratingsList = await dataReader.getRatingsList()
    let mainUser = []

    for (let i = 0; i < ratingsList.length; i++) {

        if (userId === ratingsList[i].UserId) {
            mainUser.push(ratingsList[i].MovieId)
        }
    }
    
    for (let i = 0; i < moviesList.length; i++) {
        for (let j = 0; j < mainUser.length; j++) {

            if (moviesList[i].MovieId === mainUser[j]) {
                // Splice removes mainUsers movies.
                moviesList.splice(i, 1)
            }
        }
    }

    return calculateWeight(simScores, moviesList, ratingsList)
}

/*
* Calculates the individual movies weight.
*/
calculateWeight = (simScores, newMovieList, ratingsList) => {
    let weightData = []
    
    newMovieList.forEach(movie => {
        simScores.forEach(user => {
            if (user.Similarity > 0) {
                ratingsList.forEach(rating => {
                    if (rating.UserId === user.UserId) {
                        if (movie.MovieId === rating.MovieId) {
                            // console.log(movie.MovieId)
                            let currentWeight = rating.Rating * user.Similarity
                            
                            weightData.push({
                                UserId: user.UserId,
                                MovieId: rating.MovieId,
                                WeightScore: currentWeight
                            })
                        }
                    }
                })
            }
        })
    })

    return weightData
}


module.exports = weightedScore