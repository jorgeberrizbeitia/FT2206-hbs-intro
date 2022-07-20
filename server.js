require('dotenv').config() // esto nos permite acceder a las variables env

const express = require('express')
const app = express()

// configuraciones del servidor
app.set('view engine', 'hbs');

// modulos internos
const allLessons = require("./data/somedata.js")

app.get('/', (req, res) => {
  // res.send('Hello World!')

  // aqui haremos una magia para acceder a data de una BD


  res.render(__dirname + "/views/home.hbs", {
    teacherName: "Jorge"
  }) // la data a pasar siempre debe ser un Objeto

})

app.get("/lessons", (req, res) => {

  // aqui yo le quiero renderizar al usuario una vista con todas las lecciones
  // ya tengo acceso a la data como allLessons
  // me enfoco en renderizar la vista
  res.render(__dirname + "/views/all-lessons.hbs", {
    allLessons: allLessons
  })

  // ejemplo reducido de syntaxis
  // res.render(__dirname + "/views/all-lessons.hbs", { allLessons })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})