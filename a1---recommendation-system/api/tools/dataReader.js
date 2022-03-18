const parser = require('csv-parser')
const fs = require('fs')

// https://stackoverflow.com/questions/59714395/how-should-i-return-data-from-fs-createreadstream-using-csv-parser
const dataReader = {}

dataReader.getMoviesList = () => {
    let moviesList = []

    return new Promise((resolve, reject) => {
        fs.createReadStream('./api/dataset/movies_large/movies.csv')
        .on('error', error => reject(error))
        .pipe(parser({ separator: ';' }))
        .on('data', (row) => {
            moviesList.push(row)
        })
        .on('end', () => {
            resolve(moviesList)
        })
    })
    
}

dataReader.getUsersList = () => {
    let usersList = []

    return new Promise((resolve, reject) => {
        fs.createReadStream('./api/dataset/movies_large/users.csv')
        .on('error', error => reject(error))
        .pipe(parser({ separator: ';' }))
        .on('data', (row) => {
            usersList.push(row)
        })
        .on('end', () => {
            resolve(usersList)
        })
    })
    
}

dataReader.getRatingsList = () => {
    let ratingsList = []

    return new Promise((resolve, reject) => {
        fs.createReadStream('./api/dataset/movies_large/ratings.csv')
        .on('error', error => reject(error))
        .pipe(parser({ separator: ';' }))
        .on('data', (row) => {
            ratingsList.push(row)
        })
        .on('end', () => {
            resolve(ratingsList)
        })
    })
    
}


module.exports = dataReader
