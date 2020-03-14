const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

module.exports = function ({ selector, html }) {
  try {
    const $ = cheerio.load(html)
    cheerioTableparser($)

    return $(selector).parsetable(false, false, true)
  } catch (e) {
    throw new Error(`Extract table failed with errors: \n${e.message}`)
  }
}
