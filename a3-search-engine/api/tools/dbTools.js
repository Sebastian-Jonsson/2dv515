const dbTools = {}

let id = 0
let wordMap = {}

// https://stackoverflow.com/questions/6012242/whats-the-efficiency-in-big-o-notation-of-the-in-operator-or-obj-hasownproper
dbTools.getIdForWord = (word) => {
    if (word in wordMap) {
        return wordMap[word]
    }
    else {
        wordMap[word] = id++
        return id
    }
}

// Potential future use
dbTools.getWordMap = (word) => {
    return wordMap[word]
}

// Returns documents where the words are found.
dbTools.getDocuments = (pages, word) => {
    let docs = new Map()

    for (const page of pages) {
        for (const doc of page.words) {
            
            if (doc === word) {
                docs.set(page.link, page.words)
            }
        }
    }

    return docs
}





module.exports = dbTools