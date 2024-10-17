const express = require('express')
const app = express()

const { index } = require('./routes/index')
const { about } = require('./routes/about')

app.get('/who/:name?', (req, res) => {
  const name = req.params.name;
  res.send(name + ' is my name');
})

app.get('/who/:name/:title?', (req, res) => {
  const name = req.params.name
  const title = req.params.title

  res.send(`My name is ${name} and my title is ${title}`)
})

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
  res.render('default', {
    petName: "Scooby",
    users: ['li li', 'phung', 'ralph', 'dan']
  })
})

app.get('/', index)

app.get('/about', about)

app.locals.favoritePokemon = "jigglypuff";

const server = app.listen(3000, () => {
  console.log('listening on 3000');
})
