const ClickTTCrawler = require('../lib/ClickTTCrawler')

const options = {
  baseUrl: 'https://www.mytischtennis.de/clicktt',
  organisation: 'PTTV',
  season: '19-20'
}

const crawler = new ClickTTCrawler(options)

describe('ClickTTCrawler tests', () => {
  test('getResults should return the results', async () => {
    const result = await crawler.getResults({
      league: 'Kreisliga-Sued-West',
      groupId: '359928',
      round: 'rr'
    })

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  test('getDoubleStatistics should return the statistic', async () => {
    const result = await crawler.getDoubleStatistics({
      league: 'Kreisliga-Sued-West',
      groupId: '359928',
      clubId: '2241162',
      club: 'TTC-Insheim'
    })

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  test('getPlayerStatistics should return the statistic', async () => {
    const result = await crawler.getPlayerStatistics({
      league: 'Kreisliga-Sued-West',
      groupId: '359928',
      clubId: '2241162',
      club: 'TTC-Insheim'
    })

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  test('getPlayerStatistics should return the statistic', async () => {
    const result = await crawler.getStandings({
      league: 'Kreisliga-Sued-West',
      groupId: '359928'
    })

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  test('getSchedule should return the schedules', async () => {
    const result = await crawler.getSchedule({
      league: 'Kreisliga-Sued-West',
      groupId: '359928',
      clubId: '2241162',
      club: 'TTC-Insheim'
    })

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })
})
