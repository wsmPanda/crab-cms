var readline = require('readline')
var fs = require('fs')
var os = require('os')

module.exports = {
  sql(path) {
    var readStream = fs.createReadStream(path)
    var reader = readline.createInterface({
      input: readStream
    })
    var res = []
    reader.on('line', (line) => {
      var m = line.match(/\[(.*?)\] \[(.*?)\] sql - ([\w\W]*?$)/im)
      if (m) {
        res.push({
          time: m[1],
          level: m[2],
          query: m[3]
        })
      }
    })
    reader.on('close', () => {
      console.log('readline close...')
    })
  }
}
