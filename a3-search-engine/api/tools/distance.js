const docLoc = require('../tools/docLocation')

const distance = {}

// Not in use but operates accordingly
distance.getDistanceScore = (page, queries) => {
    let score = 0

    for (let i = 0; i < queries.length - 1; i++) {
        let arr1 =[queries[i]]
        let arr2 =[queries[i + 1]]
        let loc1 = docLoc.getLocationScore(page, arr1)
        let loc2 = docLoc.getLocationScore(page, arr2)

        if (loc1 === 100000 || loc2 === 100000) {
            score += 100000
        }
        else {
            score += Math.abs(loc1, loc2)
        }
    }

    return score
}

module.exports = distance
