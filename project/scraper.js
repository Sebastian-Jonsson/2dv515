const cheerio = require('cheerio');
const axios = require('axios')
const fs = require('fs');

// Times on: https://en.wikipedia.org/wiki/Magic_(supernatural)
// 200pages is about 1min 30seconds
const numOfLinks = 220 // 220 After filtering on selected link becomes 200 files
const wikiUrl = 'https://en.wikipedia.org'
const linksPath = './dataset/wikipedia/Links/Magic/'
const wordsPath = './dataset/wikipedia/Words/Magic/'
const a3LinksPath = '../a3-search-engine/api/dataset/wikipedia/Links/Magic/'
const a3WordsPath = '../a3-search-engine/api/dataset/wikipedia/Words/Magic/'


scraper = async (url) => {
    console.log("START")
    let newHtml = await fetch(url)
    let linkSet = await getLinks(newHtml)
    console.log("END")
    
    return linkSet
}

fetch = async (url) => {
    return await axios.get(url).then(res => {
        const $ = cheerio.load(res.data)
        return $
    }).catch(console.error) // Prevents crash.
}

// https://stackoverflow.com/questions/15343292/extract-all-hyperlinks-from-external-website-using-node-js-and-request
getLinks = async ($) => {
    const newSet = new Set()
    // Start point wiki links within mw-content-text
    let contentPart = $('#mw-content-text')
    let links = contentPart.find('a')

    console.log('Unfiltered amount of links: ' + links.length)

    for (const link of links) {

        if (newSet.size >= numOfLinks) {
            break
        }

        let filteredLink = link.attribs.href
        let newScraped = await getRawHtml(filteredLink)
        
        if (newScraped !== false) {
            let newUrl = link.attribs.href

            if (filteredLink.includes('/wiki/')) {
                newUrl = wikiUrl + filteredLink
            }
            newSet.add({[newUrl]: newScraped})

            await fileParser(newUrl, newScraped)
        }
        else {
            continue
        }
    }
    return newSet
}

getRawHtml = async (link) =>  {
    if (link !== undefined) {

        if (link.includes('http') || link.includes('/wiki/')) {
            let fixedLink = link

            if (link.includes('/wiki/')) {
                fixedLink = wikiUrl + link
            }
            let newHtml = await fetch(fixedLink)

            // Verifies content
            if (newHtml !== undefined) {
                // If empty, not interesting
                if (newHtml.length > 0) {
                    return newHtml.text()
                }
            }
        }
    }
    // If content is not considered a valid link it will not be added
    return false
}

// https://www.geeksforgeeks.org/node-js-fs-writefile-method/
// https://stackoverflow.com/questions/20864893/replace-all-non-alphanumeric-characters-new-lines-and-multiple-white-space-wit
// Some files share name and content and will be overwritten removing doubles. The first 200 links will become 185 documents
fileParser = async (url, data) => {
    let fileName = new URL(url)
    let cleanName = fileName.pathname.replace(/[\W]+/g, '').replace('wiki', '')
    let cleanData = data.replace(/[\W_]+/g, ' ')

    // Here we fetch the links of current URL for the Links folder files
    let $ = await fetch(url)
    let contentPart = $('#mw-content-text')
    let links = contentPart.find('a')
    let newLinks = ''

    for (const link of links) { 
        let filteredLink = link.attribs.href

        // Second content validation
        if (filteredLink !== undefined) {
            // Excluding /w/ because some are editing sites, easily included and functional otherwise
            if (filteredLink.startsWith('//') || filteredLink.startsWith('/w/')) {}
            else {
                if (filteredLink.includes('/wiki/')) {
                    if (filteredLink.includes('#')) {
                        newLinks += wikiUrl + filteredLink
                    }
                    else {
                        newLinks += '\n' + wikiUrl + filteredLink
                    }
                }
                else {
                    if (filteredLink.includes('#')) {
                        newLinks += filteredLink
                    }
                    else {
                        newLinks += '\n' + filteredLink
                    }
                }
            }
        }
    }
    fs.writeFile(a3LinksPath + cleanName, newLinks, (err) => {console.log(err)})
    fs.writeFile(a3WordsPath + cleanName, cleanData, (err) => {console.log(err)})
}


exports.scraper = scraper