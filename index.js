const express = require('express')
const path = require("path")
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const port = process.env.port || 3500;

app.get('/', (req, res) => {
  res.render("home")
})

app.get('/projects', (req, res) => {
  res.render("projects")
})

app.get('/about', (req, res) => {
  res.render("about")
})

app.get('/signup', (req, res) => {
  res.render("signup")
})

app.get("/download/rphamcv.docx", (req, res) => {
  res.download(path.resolve("./downloadables/rphamcv.docx"))
})

app.get("/download/rphamcv.pdf", (req, res) => {
  res.download(path.resolve("./downloadables/rphamcv.pdf"))
})


app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})