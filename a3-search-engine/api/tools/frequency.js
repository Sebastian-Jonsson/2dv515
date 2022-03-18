const frequency = {}

frequency.getFrequencyScore = (page, queries) => {
    let score = 0
    
    for (const query of queries) {
        for (const word of page.words) {
            if (word === query) {
                score += 1
            }
        }
    }
    
    return score
}

module.exports = frequency
