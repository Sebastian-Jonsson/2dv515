const fs = require('fs')
const readline = require('readline')

const dataReader = {}

// https://stackoverflow.com/questions/39450961/how-to-read-a-text-file-and-return-it-as-a-json-object-in-node-js
// https://stackoverflow.com/questions/49713174/nodejs-convert-text-to-json
dataReader.getJSONBlog = () => {
    return new Promise((resolve, reject) => {
        let stream = fs.createReadStream('./api/dataset/blogdata/blogdata.txt')
        stream.on('error', reject)

        let reader = readline.createInterface({
            input: stream
        })

        let blogs = {BlogWords: {}}
        
        reader.on('line', line => {
            line = line.split('\t')
            blogs.BlogWords[line[0]] = line
        })
        reader.on('close', () => {
            resolve(blogs)
        })
    })
}


module.exports = dataReader
