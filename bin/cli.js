#!/usr/bin/env node

const program = require('commander')
const jsonfile = require('jsonfile')
const { version } = require('../package.json')
const ClickTTCrawler = require('../lib/ClickTTCrawler')

const Crawler = new ClickTTCrawler({
  baseUrl: process.env.BASE_URL || 'https://www.mytischtennis.de/clicktt',
  organisation: process.env.ORGANISATION || 'PTTV',
  season: process.env.ORGANISATION || '19-20'
})

function help () {
  /* eslint-disable no-console */
  console.log()
  console.log('Examples:')
  console.log('  $ clicktt results B2+S+2019 18')
  console.log('  $ clicktt results B2+S+2019 18 -s -f B2-S-2019_G18.json')
  console.log()
  /* eslint-enable no-console */
}

async function standings (league, groupId, options) {
  const data = await Crawler.getStandings({ league, groupId })

  if (options.save) {
    const file = options.file || `./standings_${ league }_${ groupId }.json`
    jsonfile.writeFile(file, data)
  } else {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}

async function clubSchedule (league, groupId, clubId, team, options) {
  const data = await Crawler.getSchedule({ league, groupId, clubId, team })

  if (options.save) {
    const file = options.file || `./club_schedule_${ league }_${ groupId }_${ clubId }_${ team }.json`
    jsonfile.writeFile(file, data)
  } else {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}

async function playerStatistics (league, groupId, clubId, team, options) {
  const data = await Crawler.getPlayerStatistics({ league, groupId, clubId, team })

  if (options.save) {
    const file = options.file || `./player_statistics_${ league }_${ groupId }_${ clubId }_${ team }.json`
    jsonfile.writeFile(file, data)
  } else {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}

async function doubleStatistics (league, groupId, clubId, team, options) {
  const data = await Crawler.getDoubleStatistics({ league, groupId, clubId, team })

  if (options.save) {
    const file = options.file || `./double_statistics_${ league }_${ groupId }_${ clubId }_${ team }.json`
    jsonfile.writeFile(file, data)
  } else {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}

async function results (league, groupId, round, options) {
  const data = await Crawler.getResults({ league, groupId, round })

  if (options.save) {
    const file = options.file || `./results_${ league }_${ groupId }_${ round }.json`
    jsonfile.writeFile(file, data)
  } else {
    // eslint-disable-next-line no-console
    console.log(data)
  }
}



program.version(version)
program.on('--help', help)
program.command('results <league> <groupId> <round>')
  .description('Get match results')
  .option('-s, --save', 'save match results to file')
  .option('-f, --file <file>', 'the name of the file to save to')
  .action(results)
  .on('--help', help)
program.command('standings <league> <groupId>')
  .description('Get standings')
  .option('-s, --save', 'save standings to file')
  .option('-f, --file <file>', 'the name of the file to save to')
  .action(standings)
  .on('--help', help)
program.command('schedule <league> <groupId> <clubId> <club>')
  .description('Get schedule for a club')
  .option('-s, --save', 'save match schedule for the given team')
  .option('-f, --file <file>', 'the name of the file to save to')
  .action(clubSchedule)
  .on('--help', help)
program.command('player-statistics <league> <groupId> <clubId> <club>')
  .description('Get player statistics')
  .option('-s, --save', 'save player statistics for the given team')
  .option('-f, --file <file>', 'the name of the file to save to')
  .action(playerStatistics)
  .on('--help', help)
program.command('double-statistics <league> <groupId> <clubId> <club>')
  .description('Get double statistics')
  .option('-s, --save', 'save double statistics for the given team')
  .option('-f, --file <file>', 'the name of the file to save to')
  .action(doubleStatistics)
  .on('--help', help)

program
  .parse(process.argv)
