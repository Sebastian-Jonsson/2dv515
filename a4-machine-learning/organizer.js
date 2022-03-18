const naiveBayes = require('./naive_bayes')
const dataReader = require('./dataReader')



const organizer = {}

organizer.run = async () => {
    let trainingIrisList = await dataReader.getIrisList()
    let testIrisList = await dataReader.getIrisList()
    let trainingBankList = await dataReader.getBankAuthList()
    let testBankList = await dataReader.getBankAuthList()

    let irisBayes = new naiveBayes()
    irisBayes.fit(trainingIrisList, -1)
    let irisPrediction = irisBayes.predict(trainingIrisList)
    let irisAccuracy = irisBayes.accuracy_score(irisPrediction, testIrisList)
    console.log("Iris: \n" + irisAccuracy)
    let irisConfusion = irisBayes.confusion_matrix(irisPrediction, testIrisList)
    console.log(irisConfusion)


    let bankBayes = new naiveBayes()
    bankBayes.fit(trainingBankList, -1)
    let prediction = bankBayes.predict(trainingBankList)
    let accuracy = bankBayes.accuracy_score(prediction, testBankList)
    console.log("\nBanknote_authentication: " + accuracy)
    let confusion = bankBayes.confusion_matrix(prediction, testBankList)
    console.log(confusion)

}


module.exports = organizer