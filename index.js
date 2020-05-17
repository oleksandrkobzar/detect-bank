const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 5000

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.listen(PORT, console.log(`Server running on port ${PORT}`))

//createFile('binlist-data.csv', 'ukraine.json')

function createFile(inputFile, outputFile) {
  const csv = require('csv-parser')
  const results = []

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      let data = results.filter(item => item.country === 'Ukraine');

      console.log(data)
      console.log("length: " + data.length)

      var jsonContent = JSON.stringify(data);
      fs.writeFile(outputFile, jsonContent, 'utf8', function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.")
          return console.log(err);
        }
        console.log("JSON file has been saved.")
      })
    })
}