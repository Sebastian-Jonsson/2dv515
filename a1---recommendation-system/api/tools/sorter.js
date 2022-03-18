const sorter = {}

/*
* https://www.codegrepper.com/code-examples/javascript/javascript+sort+array+of+objects+by+key+value
*/
sorter.sortDescending = (array) => {
    return array.sort((a, b) => {
        let x = a.TotalScore
        let y = b.TotalScore

        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    })
}

sorter.sizeDecider = (array, amount) => {
    let sizedArray = []

    if (array.length <= amount) {
        amount = array.length
    }

    for (let i = 0; i < amount; i++) {
        sizedArray.push(array[i])
    }

    return sizedArray
}

module.exports = sorter