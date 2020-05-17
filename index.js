const http = require('http')
const fs = require('fs')

const index = fs.readFileSync('index.html')

//createFile('binlist-data.csv', 'ukraine.json')

const server = http.createServer(function (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(index)
});

const hostname = '127.0.0.1'
const port = 3000

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/')
})

function createFile(inputFile, outFile) {
  const csv = require('csv-parser')
  const results = []

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results)
      let data = {}
      for (i in results) {
        let result = results[i]

        if (result.country === 'Ukraine') {
          data[i] = result
        }
      }
      var jsonContent = JSON.stringify(data);
      fs.writeFile(outFile, jsonContent, 'utf8', function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.")
          return console.log(err);
        }
        console.log("JSON file has been saved.")
      })
    })
}