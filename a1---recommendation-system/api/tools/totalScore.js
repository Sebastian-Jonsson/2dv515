const sumsScore = {}

sumsScore.totalScoreStart = (simScores, weightScores) => {
    let weightSum = calculateWeightSum(weightScores)
    let simSum = calculateSimilaritySum(simScores, weightScores)
    let totalScore = calculateTotalScore(weightSum, simSum)

    // console.log(simScores)
    console.log(weightScores.length)

    return totalScore
}

calculateWeightSum = (weightScores) => {
    let movieWeightSums = weightScores.reduce((prev, curr) => {

        if (prev[curr.MovieId]) {
            prev[curr.MovieId].WeightScore = prev[curr.MovieId].WeightScore + curr.WeightScore
        }
        else {
            prev[curr.MovieId] = curr
        }
        return prev
    }, [])

    // Filter removes empty items
    return movieWeightSums.filter(n => n)
}

calculateSimilaritySum = (simScores, weightScores) => {
    let similaritySum = []
    let filterSimSum = []

    // Retrieves similarity values for the correct movies
    for (let i = 0; i < weightScores.length; i++) {
        for (let k = 0; k < simScores.length; k++) {

            if (simScores[k].UserId === weightScores[i].UserId) {
                similaritySum.push({MovieId: weightScores[i].MovieId, Similarity: simScores[k].Similarity})
            }
        }
    }

    // Checks for duplicates and merges them, adding similarity scores to the total sum for a movie
    for (let i = 0; i < similaritySum.length; i++) {
        let foundIt = false

        if (filterSimSum.length === 0) {
            filterSimSum.push({MovieId: similaritySum[i].MovieId, SimilaritySum: similaritySum[i].Similarity})
            continue
        }
        for (let k = 0; k < filterSimSum.length; k++) {

            if (similaritySum[i].MovieId === filterSimSum[k].MovieId) {
                filterSimSum[k].SimilaritySum += similaritySum[i].Similarity
                foundIt = true
                break
            }  
        }

        if (!foundIt) {
            filterSimSum.push({MovieId: similaritySum[i].MovieId, SimilaritySum: similaritySum[i].Similarity})
        }
    }

    return filterSimSum
}

calculateTotalScore = (weightSum, simSum) => {
    let mergedSums = mergeSums(weightSum, simSum)
    let totalScores = []
    
    for (let i = 0; i < mergedSums.length; i++) {
        let totalScore = mergedSums[i].WeightSum / mergedSums[i].SimilaritySum
        totalScores.push({MovieId: mergedSums[i].MovieId, TotalScore: totalScore})
    }

    return totalScores
}

mergeSums = (weightSum, simSum) => {
    let mergedSums = []

    for (let i = 0; i < weightSum.length; i++) {
        mergedSums.push({
            MovieId: weightSum[i].MovieId,
            WeightSum: weightSum[i].WeightScore,
            SimilaritySum: simSum[i].SimilaritySum
        })    
    }

    return mergedSums
}


module.exports = sumsScore