# clicktt-crawler
> Extracts championship results, schedules and statistics from from https://www.mytischtennis.de/clicktt/home/ and provides data as JSON

## Commands

clicktt-crawler provides a CLI with useful commands

### Setup

- Add `clicktt-crawler` as global dependency using yarn or npm

### List of commands

| Command | Description |
| --- | --- |
| `results [options] <league> <groupId> <round>` | Get match results |
| `standings [options] <league> <groupId>` | Get standings |
| `schedule [options] <league> <groupId> <clubId> <club>` | Get schedule for a club |
| `player-statistics [options] <league> <groupId> <clubId> <club>` | Get player statistics |
| `double-statistics [options] <league> <groupId> <clubId> <club>` | Get double statistics |


You can use `--help` with any command to get detailed usage. Common arguments are:

`-s` or `--save`: Save the JSON data to a file
`-f <file>` or `--file <file>`: Name of the file to save to

### Usage

`$ clicktt results "Kreisliga-Sued-West" "359928" "rr"` : Print the results to the console

`$ clicktt results "Kreisliga-Sued-West" "359928" "rr" -s` : Save the result to a file `results_Kreisliga-Sued-West_359928_rr.json`

`$ clicktt results "Kreisliga-Sued-West" "359928" "rr" -s -f results.json`: Save the result to a file `result.json`

## Use `clicktt-crawler` programmatically

### Setup

- Add `clicktt-crawler` dependency using yarn or npm to your project

### Usage

```javascript
const ClickTTCrawler = require('clicktt-crawler')
const crawler = new ClickTTCrawler({
 baseUrl: 'https://www.mytischtennis.de/clicktt',
 organisation: 'PTTV',
 season: '19-20'
})
const result = await crawler.getResults({
  league: 'Kreisliga-Sued-West',
  groupId: '359928',
  round: 'rr'
})
```

## JSON data format

### Results

```json
[
   {
      date: 'So 12.01.20',
      time: '10:00',
      location: '1',
      home: 'TTC Insheim',
      guest: 'TSV Annweiler',
      result: '9:1'
    }
]
```

### Double statistics

```json
[
  {
    name: 'Croissant, Christoph\n\n/\n\nBender, Philipp',
    played: '7',
    total: '6:2'
  }
]
```

### Single players statistics

```json
[
  {
    position: '1.1',
    name: 'Croissant, Christoph',
    played: '10',
    pos1: '8:2',
    pos2: '9:1',
    pos3: '',
    pos4: '',
    pos5: '',
    pos6: '',
    total: '17:3'
  }
]
```


### Schedule

```json
[
  {
    date: '24.04.20',
    time: '20:00',
    location: '1',
    home: 'TTC Rohrbach',
    guest: 'TTC Insheim',
    resultHome: 3,
    resultGuest: 9
  }
]
```

### Standings

```json
[
   {
      position: '6',
      club: 'TTC Insheim',
      played: '15',
      won: '6',
      drawn: '1',
      lost: '8',
      games: '96:90+6',
      difference: '+6',
      points: '13:17'
   }
]
```
  
## License

[MIT License](./LICENSE)

Copyright (c) Philipp Bender <philipp.bender.de@googlemail.com>
