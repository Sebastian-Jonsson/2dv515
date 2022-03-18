const normalization = {}

normalization.normalize = (scores, smallIsBetter) => {
    if (smallIsBetter) {
        let minScore = Math.min(...scores)

        for (let i = 0; i < scores.length; i++) {
            scores[i] = minScore / Math.max(scores[i], 0.00001)
        }
    }
    else {
        let maxScore = Math.max(...scores)
        maxScore = Math.max(maxScore, 0.00001)

        for (let i = 0; i < scores.length; i++) {
            scores[i] = scores[i] / maxScore
        }
    }
}

module.exports = normalization
