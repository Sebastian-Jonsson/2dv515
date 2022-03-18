const dataReader = require('../tools/dataReader')
const dbTools = require('../tools/dbTools')
const qAlg = require('../tools/queryAlgorithm')

const pages = dataReader.startReader()

const searchEngineController = {}

searchEngineController.getSearch = (req, res, next) => {
    try {
        let query = req.query.sentence.toLowerCase()
        let words = query.split(' ')
        let wordList = []

        for (const word of words) {
            if (dbTools.getWordMap(word)) {
                wordList.push(dbTools.getIdForWord(word))
            }
        }

        // Returns documents where the words are found.
        let docs = []
        for (const word of wordList) {
            docs.push(dbTools.getDocuments(pages, word))
        }

        // Returns documents where the words are found without duplicates.
        let docList = new Map()
        for (const map of docs) {
            for (const [key, value] of map) {
                docList.set(key, value)
            }
        }
        
        // For clarification, the "algorithm include all pages where any search query word appears at least once on the page"
        // Page 18: "super" OR "mario"
        let queryResult = qAlg.queryAlg(wordList, docList)

        res.status(200).json(queryResult)
        
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = searchEngineController