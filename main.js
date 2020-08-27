#! /usr/bin/env node
const request = require('request')
const inquirer = require('inquirer')

function displayAdress (zipcode) {
  const options = {
    url: `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`,
    json: true
  }
  request.get(options, function(err, res, body) {
    if (body.results == null) {
    console.log("Nonexistent zip code")
    } else {
      const addressDetails = body.results[0]
      const prefecture = addressDetails.address1
      const city = addressDetails.address2
      const town = addressDetails.address3
      console.log(prefecture + city + town)
    }
  })
}

function exec () {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'zipcode',
        message: 'Enter the japanese zip code.',
        validate: (input) => {
          if (
            input.match(/^[0-9]{3}-[0-9]{4}$/) ||
            input.match(/[0-9]{7}/)
          ) {
            return true;
          } else {
            return 'invalid value.'
          }
        }
      }
    ])
    .then((answers) => {
      displayAdress(answers.zipcode)
    })
}

exec()
