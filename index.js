const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

const app = express()

const url = 'https://www.nu.nl'

axios(url)
    .then(response => {
        const html = response.data
        //load allows to pass through html
        const $ = cheerio.load(html)
        const articles = []

        $('.list__item--text', html).each(function () {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            const base = 'https://www.nu.nl'
            articles.push({
                title,
                url: base + url

            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json('welcome to this web-scraper')
})


app.listen(PORT, () => console.log('server running')) 