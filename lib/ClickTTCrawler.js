const translateVector = require('lodash.zip')
const fetch = require('./utils/fetch')
const extractTable = require('./utils/extractTable')
const extractPlayerStatisticTable = require('./utils/extractPlayerStatisticTable')
const extractDoubleStatisticTable = require('./utils/extractDoubleStatisticTable')


class ClickTTCrawler {
  constructor (options) {
    this.baseUrl = options.baseUrl
    this.organisation = options.organisation
    this.season = options.season
  }

  getTableDataByPrecedingTitle ({ title, html }) {
    return extractTable({
      selector: `h3:contains("${ title }") + table`,
      html
    })
  }

  getTableDataById ({ id, html }) {
    return extractTable({
      selector: `#${ id }`,
      html
    })
  }

  // https://www.mytischtennis.de/clicktt/PTTV/19-20/ligen/Kreisliga-Sued-West/gruppe/359928/tabelle/gesamt
  async getStandings ({ league, groupId }) {
    const url = `${this.baseUrl}/${this.organisation}/${this.season}/ligen/${league}/gruppe/${groupId}/tabelle/gesamt`
    const html = await fetch({ url })

    let data = this.getTableDataByPrecedingTitle({ title: 'Tabelle', html }) // get array of table columns

    data.shift() // remove first row with empty values
    data = translateVector(...data)
    data.shift() // remove labels

    const labels = ['position', 'club', 'played', 'won', 'drawn', 'lost', 'games', 'difference', 'points']
    return data.map((row) => {
      const clubResult = {}
      for (let i = 0; i < labels.length; i++) {
        clubResult[`${ labels[i] }`] = row[i].replace(/\d*\./g, '').trim() // array of values to object { label: value }
      }
      return clubResult
    })
  }

  // https://www.mytischtennis.de/clicktt/PTTV/19-20/ligen/Kreisliga-Sued-West/gruppe/359928/mannschaft/2241162/TTC-Insheim/spielerbilanzen/gesamt
  async getSchedule ({ league, groupId, clubId, club }) {
    const url = `${this.baseUrl}/${this.organisation}/${this.season}/ligen/${league}/gruppe/${groupId}/mannschaft/${clubId}/${club}/spielerbilanzen/gesamt`
    const html = await fetch({ url })

    let data = this.getTableDataByPrecedingTitle({ title: 'Spielplan (gesamt)', html }) // get array of table columns

    data.pop() // remove last item with empty values
    data.splice(5, 1) // remove 6th item
    data = translateVector(...data)
    data.shift() // remove labels

    const labels = ['date', 'time', 'location', 'home', 'guest', 'result']
    return data.map((row) => {
      const scheduleItem = {}
      for (let i = 0; i < labels.length; i++) {
        const column = labels[i];
        const content = row[i].trim();

        if (column === 'date') {
          const dateParse = /(\d+)\.(\d+)\.(\d+)/.exec(content)
          scheduleItem[column] = `${ dateParse[1] }.${ dateParse[2] }.${ dateParse[3] }`
        } else if (column === 'time') {
          const timeParse = /(\d+):(\d+)/.exec(content)
          scheduleItem[column] = (timeParse) ? timeParse[0] : ''
        } else if (column === 'result') {
          const resultParse = /(\d+):(\d+)/.exec(content)
          if (resultParse) {
            scheduleItem['resultHome'] = parseInt(resultParse[1])
            scheduleItem['resultGues'] = parseInt(resultParse[2])
          }
        } else {
          scheduleItem[column] = content
        }
      }
      return scheduleItem
    })
  }


  // https://www.mytischtennis.de/clicktt/PTTV/19-20/ligen/Kreisliga-Sued-West/gruppe/359928/mannschaft/2241162/TTC-Insheim/spielerbilanzen/gesamt
  async getPlayerStatistics ({ league, groupId, clubId, club }) {
    const url = `${this.baseUrl}/${this.organisation}/${this.season}/ligen/${league}/gruppe/${groupId}/mannschaft/${clubId}/${club}/spielerbilanzen/gesamt`
    const html = await fetch({ url })

    return extractPlayerStatisticTable({ html })
  }

  // https://www.mytischtennis.de/clicktt/PTTV/19-20/ligen/Kreisliga-Sued-West/gruppe/359928/mannschaft/2241162/TTC-Insheim/spielerbilanzen/gesamt
  async getDoubleStatistics ({ league, groupId, clubId, club }) {
    const url = `${this.baseUrl}/${this.organisation}/${this.season}/ligen/${league}/gruppe/${groupId}/mannschaft/${clubId}/${club}/spielerbilanzen/gesamt`
    const html = await fetch({ url })

    return extractDoubleStatisticTable({ html })
  }

  // https://www.mytischtennis.de/clicktt/PTTV/19-20/ligen/Kreisliga-Sued-West/gruppe/359928/spielplan/rr/
  async getResults ({ league, groupId, round }) {
    const url = `${this.baseUrl}/${this.organisation}/${this.season}/ligen/${league}/gruppe/${groupId}/spielplan/${round}`
    const html = await fetch({ url })

    let data = this.getTableDataById({ id: 'playingPlanDesktop', html }) // get array of table columns

    data = translateVector(...data)
    data.shift() // remove labels

    const labels = ['date', 'time', 'location', 'home', 'guest', undefined, 'result']
    return data.map((row) => {
      const teamResult = {}
      for (let i = 0; i < labels.length; i++) {
        if(labels[i]) {
          teamResult[labels[i]] = row[i].trim()
        }
      }

      return teamResult
    })
  }
}

module.exports = ClickTTCrawler
