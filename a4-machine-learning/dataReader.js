const parser = require('csv-parser')
const fs = require('fs')

const dataReader = {}

dataReader.getBankAuthList = () => {
    let bankAuthList = []

    return new Promise((resolve, reject) => {
        fs.createReadStream('./dataset/banknote_authentication/banknote_authentication.csv')
        .on('error', error => reject(error))
        .pipe(parser({ separator: ',' }))
        .on('data', (row) => {
            bankAuthList.push(row)
        })
        .on('end', () => {
            resolve(bankAuthList)
        })
    }) 
}

dataReader.getIrisList = () => {
    let bankAuthList = []

    return new Promise((resolve, reject) => {
        fs.createReadStream('./dataset/Iris/iris.csv')
        .on('error', error => reject(error))
        .pipe(parser({ separator: ',' }))
        .on('data', (row) => {
            bankAuthList.push(row)
        })
        .on('end', () => {
            resolve(bankAuthList)
        })
    }) 
}

module.exports = dataReader