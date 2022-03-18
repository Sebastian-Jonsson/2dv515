const fs = require('fs')
const wordToId = require('./dbTools')

const linkGame = '../dataset/wikipedia/Links/Games'
const linkProgramming = '../dataset/wikipedia/Links/Programming'
const wordGame = '\\api\\dataset\\wikipedia\\Words\\Games'
const wordProgramming = '\\api\\dataset\\wikipedia\\Words\\Programming'
const wordMagic = '\\api\\dataset\\wikipedia\\Words\\Magic'
const wikiPath = 'https://en.wikipedia.org/wiki/'

const dataReader = {}


// https://www.geeksforgeeks.org/node-js-fs-readdirsync-method/
dataReader.startReader = () => {
    // const gameWords = readDirectory(process.cwd() + wordGame)
    // const programmingWords = readDirectory(process.cwd() + wordProgramming)
    // const allWords = gameWords.concat(programmingWords)
    // return allWords
    const magicWords = readDirectory(process.cwd() + wordMagic)
    return magicWords
}

// In the example case of files Algorithm and Algorithm_design where it is the same site but different links:
// I will count them as separate search results as the Algorithm_design brings one to a different part of the site.
readDirectory = (path) => {
    return fs.readdirSync(path).map(file => ({
        link: wikiPath + file,
        words: readFiles(path, file)
    }))
}

// https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
readFiles = (path, file) => {
    return fs.readFileSync(path + '\\' + file, {encoding:'utf8'}).split(' ').map((line) => wordToId.getIdForWord(line.toLowerCase()))
}


module.exports = dataReader
