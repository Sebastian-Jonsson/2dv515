const Centroid = require('../models/centroid')

const kMeansClustering = {}

const n = 706
const kNum = 5
const MAX_ITERATIONS = 20

kMeansClustering.startpoint = (blogList) => {
    return kMeansAlgorithm(blogList)
}

kMeansAlgorithm = (blogList) => {
    let centroids = []
    
    for (let c = 0; c < kNum; c++) {
        let centroid = new Centroid()
        
        for (let i = 0; i < n; i++) {
            centroid.set_word_count(i, wordCountRange(i, blogList))
        }
        centroids.push(centroid)
    }

    for (let i = 0; i < MAX_ITERATIONS; i++) { 
        for (const centroid of centroids) {
            centroid.clear_assignments()
        }

        for (const blog of blogList) {
            if (blog.blogName === 'Blog') {
                continue
            }
            else {
                let distance = Number.MAX_VALUE
                let best = new Centroid()
                
                for (const centroid of centroids) {
                    let cDist = pearsonDistance(centroid.word_count, blog.blogContent[0])
                    
                    if (cDist < distance) {
                        best = centroid
                        distance = cDist
                    }
                    console.log(best === centroid)
                }

                best.set_assignment(blog)
            }
        }

        if (i > 0) {
            for (const centroid of centroids) {
                if (centroid.compare_assignments()) {
                    return centroids
                }
            }    
        }

        for (const centroid of centroids) {
            for (let i = 0; i < n; i++) {
                let avg = 0

                for (const blog of centroid.assignments) {
                    avg += blog.word_count(i)
                    avg /= centroid.assignments.length
                    centroid.set_word_count(i, avg)
                }
            }
        }
    }

    return centroids
}

pearsonDistance = (blogA, blogB) => {
    let sumA = 0, sumB = 0, sumAsq = 0, sumBsq = 0, pSum = 0

    for (let i = 0; i < n; i++) {
        let cntA = blogA[i]
        let cntB = parseInt(blogB[i])
        sumA += cntA
        sumB += cntB
        sumAsq += cntA**2
        sumBsq += cntB**2
        pSum += cntA * cntB
    }
    
    let num = pSum - (sumA * sumB / n)
    let den = Math.sqrt((sumAsq - sumA**2 / n) * (sumBsq - sumB**2 / n))

    return 1.0 - num / den
}


wordCountRange = (i, blogList) => {
    let min = null
    let max = null

    // Skips index 0 since it is the wordlist
    for (let k = 1; k <= blogList.length - 1; k++) {
        let newNum = parseFloat(blogList[k].blogContent[0][i])

        if (min === null && max === null) {
            min = newNum
            max = newNum
        }
        if (newNum < min) {
            min = newNum
        }
        if (newNum > max) {
            max = newNum
        }
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
    return Math.floor(Math.random() * (max - min + 1) + min)
}


module.exports = kMeansClustering