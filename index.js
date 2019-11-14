const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cost', calculateRate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calculateRate(req, res) {
  
      let weight = req.query.weight;
      let mailType = req.query.packageType;
      let sum = 0;

  switch (Number(mailType)) {
    case 1:
      if (weight < 1) {
        sum = .55;
      } else if (weight < 2) {
        sum = .70;
      } else if (weight < 3) {
        sum = .85;
      } else if (weight < 3.5) {
        sum = 1.00
      } else {
        sum = "The size you have chosen is too large"
      }
      break;

    case 2:
      if (weight < 1) {
        sum = .50;
      } else if (weight < 2) {
        sum = .65;
      } else if (weight < 3) {
        sum = .80;
      } else if (weight < 3.5) {
        sum = .95;
      } else {
        sum = "The size you have chosen is too large"
      }
      break;

    case 3:
      let base = 1.00;
      sum = base + (Math.ceil(weight) * .15);
      break;

    case 4:
      if (weight > 0 && weight <= 4) {
        sum = 3.95;
      } else if (weight > 4 && weight <= 8) {
        sum = 4.69;
      } else if (weight > 8 && weight <= 12) {
        sum = 5.53;
      } else if (weight > 12 && weight <= 13) {
        sum = 6.13;
      } else {
        sum = "The size you have chosen is too large"
      }
      break;
      
  }

  // Set up a JSON object of the values we want to pass along to the EJS result page
  const params = {
    weight: weight,
    mailType: mailType,
    total: sum
  };

  // Render the response, using the EJS page "result.ejs" in the pages directory
  // Makes sure to pass it the parameters we need.
  res.render('pages/cost', params);
}