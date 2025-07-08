const express = require('express')
const path = require("path")
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const port = process.env.port || 3500;

app.get('/', (req, res) => {

  //DATA
  const countries = require('./data/global/home/countries.json');
  const franchisees = require('./data/global/home/franchisees.json');
  


  res.render("home", { 
    franchisees,
    countries
   });
})


app.get('/about', (req, res) => {
  res.render("about")
})

app.get('/signup', (req, res) => {
  res.render("signup")
})

// app.js or your Express route file




app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})