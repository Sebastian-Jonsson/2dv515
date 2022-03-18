const dataReader = require('./dataReader')

const pearsonSimilarity = {}

pearsonSimilarity.pearsonStart = (user) => {
    return usersPearsonCheck(user)
}

usersPearsonCheck = async (userId) => {
    let userList = await dataReader.getUsersList()
    let ratingList = await dataReader.getRatingsList()
    let mainUser = []
    let simList = []
    
    for (let i = 0; i < ratingList.length; i++) {
        if (userId === ratingList[i].UserId) {
            mainUser.push(ratingList[i])
        }
    }
    
    for (let i = 0; i < userList.length; i++) {
        let secondUser = []
        
        if (userId !== userList[i].UserId) {
            for (let j = 0; j < ratingList.length; j++) {
                
                if (userList[i].UserId === ratingList[j].UserId) {
                    secondUser.push(ratingList[j])   
                }
            }
            simList.push({UserId: secondUser[0].UserId, Similarity: pearsonCalc(mainUser, secondUser)})
        }
    }
    
    return simList
}

/**
 * https://coursepress.lnu.se/courses/web-intelligence/9c2b9755b69296cda5b0c01a7b3048a2/2-Recommendation-Systems.pdf
 */
pearsonCalc = (user1, user2) => {
    let sum1 = 0, sum2 = 0, sum1sq = 0, sum2sq = 0, pSum = 0, c = 0
    
    user1.forEach(rating1 => {
        user2.forEach(rating2 => {
            if (rating1.MovieId === rating2.MovieId) {
                // Enforce type of sum1/sum2 by *1
                sum1 += rating1.Rating*1
                sum2 += rating2.Rating*1
                sum1sq += rating1.Rating**2
                sum2sq += rating2.Rating**2
                pSum += rating1.Rating * rating2.Rating
                c += 1
            }
        })
    })
    if (c === 0) {
        return 0
    }
    let num = pSum - (sum1 * sum2 / c)
    let den = Math.sqrt((sum1sq - sum1**2 / c) * (sum2sq - sum2**2 / c))

    return num / den
}

module.exports = pearsonSimilarity