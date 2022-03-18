const docLocation = {}

docLocation.getLocationScore = (page, queries) => {
    let score = 0

    for (const query of queries) {
        let found = false
        let index = 0

        for (const word of page.words) {
            
            if (word === query) {
                score += index + 1
                
                found = true
                break
            }
            index++
        }
        if (!found) {
            score += 100000
        }
    }

    return score
}

module.exports = docLocation
