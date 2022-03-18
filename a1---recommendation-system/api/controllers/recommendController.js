const dataReader = require('../tools/dataReader')
const eSim = require('../tools/euclideanSimilarity')
const pSim = require('../tools/pearsonSimilarity')
const wScores = require('../tools/weightedScore')
const tScores = require('../tools/totalScore')
const idNamer = require('../tools/idNamer')
const sorter = require('../tools/sorter')


const recommendController = {}

recommendController.getUsersList = async (req, res, next) => {
    try {
        let users = await dataReader.getUsersList()
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

recommendController.getScoreTable = async (req, res, next) => {
    try {
        let simScores

        if (req.query.similarity === 'euclidean') {
            simScores = await eSim.euclideanStart(req.query.user)
        }
        if (req.query.similarity === 'pearson') {
            simScores = await pSim.pearsonStart(req.query.user)
        }
        let weightScores = await wScores.weightedStart(req.query.user, simScores)
        let totalScores = tScores.totalScoreStart(simScores, weightScores)
        let table = await idNamer.movieId(totalScores)
    
        sorter.sortDescending(table)

        let sizedArray = sorter.sizeDecider(table, req.query.results)

        res.status(200).json(sizedArray)
        
    } catch (error) {
        res.status(500).json(error)
    }


}

recommendController.postFunction = async (req, res, next) => {

}

recommendController.putFunction = async (req, res, next) => {

}

recommendController.deleteFunction = async (req, res, next) => {

}


module.exports = recommendController