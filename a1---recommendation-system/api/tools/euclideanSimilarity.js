const dataReader = require('./dataReader')

const euclideanSimilarity = {}

euclideanSimilarity.euclideanStart = (user) => {
    return usersEuclideanCheck(user)
}

usersEuclideanCheck = async (userId) => {
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
            simList.push({UserId: secondUser[0].UserId, Similarity: euclideanCalc(mainUser, secondUser)})
        }
    }

    return simList
}

/**
 * https://coursepress.lnu.se/courses/web-intelligence/9c2b9755b69296cda5b0c01a7b3048a2/2-Recommendation-Systems.pdf
 */
euclideanCalc = (user1, user2) => {
    let sim = 0
    let c = 0
    
    user1.forEach(rating1 => {
        user2.forEach(rating2 => {
            if (rating1.MovieId === rating2.MovieId) {
                sim += (rating1.Rating - rating2.Rating)**2
                c += 1
            }
        })
    })
    if (c === 0) {
        return 0
    }

    return 1 / (1 + sim)
}


module.exports = euclideanSimilarity