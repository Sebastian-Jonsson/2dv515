const express = require('express')
const { scraper: scraper } = require('./scraper')
const app = express()
const PORT = 4000

// https://www.scrapingbee.com/blog/web-scraping-javascript/
app.get('/:link?', async (req, res) => {
    let rawHtml = await scraper(req.query.link)
    
    res.status(200).json("See folders in either Assignment 3 or dataset in Project :)")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})
