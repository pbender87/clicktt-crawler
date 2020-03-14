const cheerio = require('cheerio')

module.exports = function ({ html }) {
  try {
    const $ = cheerio.load(html)

    const table = $('tbody').eq(1)
    const columnDefinitions = ['position', 'name', 'played', 'pos1', 'pos2', 'pos3', 'pos4', 'pos5', 'pos6', undefined, 'total']

    const result = []
    $('tr', table).each(function (row_idx, row) {
      const data = {}

      const tdList = $('td', row)

      // Single statistics including hidden rows
      if (tdList.length === 11) {
        tdList.each(function (col_idx, col) {
          const column = columnDefinitions[col_idx]
          if(column) {
            data[column] = $(col).text().trim() || ''
          }
        })

        result.push(data)
      }
    })

    return result
  } catch (e) {
    throw new Error(`Extract table failed with errors: \n${e.message}`)
  }
}
