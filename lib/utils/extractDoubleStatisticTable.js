const cheerio = require('cheerio')

module.exports = function ({ html }) {
  try {
    const $ = cheerio.load(html)

    const table = $('tbody').eq(1)
    const columnDefinitions = [undefined, 'name', 'played', undefined, 'total']

    const result = []
    $('tr', table).each(function (row_idx, row) {
      const data = {}

      const tdList = $('td', row)

      // Double statistics including hidden rows
      if (tdList.length === 5) {
        tdList.each(function (col_idx, col) {
          const column = columnDefinitions[col_idx]
          if(column) {
            data[column] = $(col).text().trim() || ''
          }
        })

        if (data.name.includes('/')) {
          result.push(data)
        }
      }
    })

    return result
  } catch (e) {
    throw new Error(`Extract table failed with errors: \n${e.message}`)
  }
}
