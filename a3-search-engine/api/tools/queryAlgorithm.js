const nrmz = require('../tools/normalization')
const freq = require('../tools/frequency')
const docLoc = require('../tools/docLocation')

const amountOfDecimals = 2

const queryAlgorithm = {}

queryAlgorithm.queryAlg = (queries, docList) => {
    let result = []
    let scores = {frequency: [], location: []}

    let index = 0
    for (const [key, value] of docList) {
        let page = {link: key, words: value}

        scores.frequency[index] = freq.getFrequencyScore(page, queries)
        scores.location[index] = docLoc.getLocationScore(page, queries)
        
        index += 1
    }

    nrmz.normalize(scores.frequency, false)
    nrmz.normalize(scores.location, true)

    index = 0
    let score = 0
    for (const doc of docList) {
        if (scores.frequency[index] > 0) {
            score = scores.frequency[index] + 0.8 * scores.location[index]
        }  

        result.push({page: doc[0], score: round(score), content: round(scores.frequency[index]), location: round(0.8 * scores.location[index])})
        index++
    }
    sortDescending(result)

    return result
}

// Depending on the amount of decimals, it does not match the example given on the course site.
round = (num) => {
    return Number.parseFloat(num.toFixed(amountOfDecimals))
}

sortDescending = (array) => {
    return array.sort((a, b) => {
        let x = a.score
        let y = b.score

        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    })
}


module.exports = queryAlgorithm
