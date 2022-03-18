
// https://machinelearningmastery.com/naive-bayes-classifier-scratch-python/
// https://coursepress.lnu.se/courses/web-intelligence/0dac410a2a792f6d335bafb42d296b66/7-Naive-Bayes-algorithm.pdf
class Naive_Bayes {

    constructor() {
        this.separated
        this.meansAndStdevs
    }

    fit(x, y) {
        this.separated = separateByClass(x, y)
        this.meansAndStdevs = calcMeanAndStandardDeviation(this.separated)
    }

    predict(x) {
        let predList = calcGPDF(x, this.meansAndStdevs)
        let bestPredictions = getBestPredictions(predList)

        return bestPredictions
    }

    accuracy_score(predList, testList) {
        let count = 0
        let k = 0

        for (const i in testList) {
            let class_value = Object.values(testList[i])[Object.values(testList[i]).length - 1]
            if (class_value === predList[k].type) {
                count++
            }
            k++
        }
        let percentage = "Accuracy: " + ((count / testList.length) * 100).toFixed(2) + "%"
        let numbers = "(" + count + "/" + testList.length + " correctly classified)"

        return percentage + " " + numbers
    }

    confusion_matrix(predList, testList) {
        let matrix = {}

        // Gets all types
        for (const i in testList) {
            let class_value = Object.values(testList[i])[Object.values(testList[i]).length - 1]
            matrix[class_value] = { truePred: 0, falsePred: 0 }
        }

        for (const type of Object.entries(matrix)) {
            let k = 0
            let trueCount = 0
            let falseCount = 0
            
            for (const i in testList) {
                let class_value = Object.values(testList[i])[Object.values(testList[i]).length - 1]

                if (class_value === type[0]) {
                    if (class_value === predList[k].type) {
                        matrix[class_value].truePred = ++trueCount
                    }
                    else {
                        matrix[class_value].falsePred = {[predList[k].type]: ++falseCount}
                    }
                }
                k++
            }
        }
        return formatTable(matrix)
    }

    crossval_predict(folds) {
        // Runs n-fold cross-validation and returns a list of predictions.
    }
}

formatTable = (matrix) => {
    let format = []
    
    for (const [key, item] of Object.entries(matrix)) {
        format[key] = ({[key]: "True: " + item.truePred + " | False: " + Object.keys(item.falsePred) + " had " + Object.values(item.falsePred)})
    }

    console.table(format)
}

getBestPredictions = (predList) => {
    let bestPreds = []
    
    for (const item of predList) {
        let bestProb = {type: '', prob: null}
        // Picks the best probability
        for (const [key, val] of Object.entries(item)) {
            if (bestProb.prob < val || bestProb.prob === null) {
                bestProb.type = key
                bestProb.prob = val
            }
        }
        bestPreds.push(bestProb)
    }

    return bestPreds
}

calcGPDF = (x, sumVals) => {
    let predictions = []

    for (const item of x) {
        let currentPred = []
        let k = 0

        // value is the amount of different types of example iris flowers
        for (const value of Object.values(sumVals.means)) {
            // Makes certain that there are objects put into each currentPred
            currentPred[Object.keys(value)[0]] = {}
            let count = 0.0

            for (let i = 0; i < Object.values(item).length; i++) {
                let propMean = Object.values(Object.values(sumVals.means[k])[0])[i]
                let propStdev = Object.values(Object.values(sumVals.stdevs[k])[0])[i]
                let currentItemProp = Object.values(item)[i]

                count += Math.log((calcProbability(currentItemProp, propMean, propStdev)))
            }
            currentPred[Object.keys(value)[0]] = count
            k++
        }
        predictions.push(currentPred)
    }

    return predictions
}

// https://stackoverflow.com/questions/17891595/pow-vs-exp-performance
calcProbability = (x, mean, stdev) => {
    let exponent = Math.exp(-(((x - mean)**2) / (2 * (stdev**2))))
    return (1 / (Math.sqrt(2 * Math.PI) * stdev)) * exponent
}

calcStdev = (array1, means) => {
    let allStdevs = []
    let variance1 = 0, variance2 = 0, variance3 = 0, variance4 = 0

    for (let i = 0; i < Object.keys(array1).length; i++) {

        if (array1[i] === undefined) {
            continue
        }
        // Forof object keys on array1[i], add only one counter
        variance1 += (parseFloat(Object.values(array1[i])[0]) - means[0])**2
        variance2 += (parseFloat(Object.values(array1[i])[1]) - means[1])**2
        variance3 += (parseFloat(Object.values(array1[i])[2]) - means[2])**2
        variance4 += (parseFloat(Object.values(array1[i])[3]) - means[3])**2
    }

    // Forof object keys on array1[i], push in one num at a time
    allStdevs.push(
        Math.sqrt(variance1 / (Object.keys(array1).length - 1)),
        Math.sqrt(variance2 / (Object.keys(array1).length - 1)),
        Math.sqrt(variance3 / (Object.keys(array1).length - 1)),
        Math.sqrt(variance4 / (Object.keys(array1).length - 1)),
    )

    return allStdevs
}

calcMeanAndStandardDeviation = (sortedSeparated) => {
    let allMeans = []
    let allStdevs = []
    let allCounts = []
    
    for (const array of Object.entries(sortedSeparated)) {
        let count1 = 0, count2 = 0, count3 = 0, count4 = 0
        let means = []

        for (let i = 0; i < Object.keys(array[1]).length; i++) {
            // Forof object keys on array1[i], add only one counter
            count1 += parseFloat(Object.values(array[1][i])[0])
            count2 += parseFloat(Object.values(array[1][i])[1])
            count3 += parseFloat(Object.values(array[1][i])[2])
            count4 += parseFloat(Object.values(array[1][i])[3])
        }
        // Forof object keys on array1[i], push in one num at a time
        means.push(
            count1 / Object.keys(array[1]).length,
            count2 / Object.keys(array[1]).length,
            count3 / Object.keys(array[1]).length,
            count4 / Object.keys(array[1]).length
        )

        allStdevs.push({[array[0]]: calcStdev(array[1], means)})
        allMeans.push({[array[0]]: means})
        allCounts.push({[array[0]]: Object.keys(array[1]).length})
    }

    return {means: allMeans, stdevs: allStdevs, counts: allCounts}
}

separateByClass = (x, y) => {
    let separatedList = {}

    for (const i in x) {
        let vector = x[i]
        let class_value = Object.values(vector)[Object.values(vector).length + y]
        let removeProperty = Object.keys(vector)[Object.keys(vector).length + y]
        delete vector[removeProperty]
        
        if (!separatedList[class_value]) {
            separatedList[class_value] = []
            separatedList[class_value].push(vector)
        }
        else {
            separatedList[class_value].push(vector)
        }
    }

    return separatedList
}


module.exports = Naive_Bayes