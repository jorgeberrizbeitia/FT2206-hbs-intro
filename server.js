require('dotenv').config() // esto nos permite acceder a las variables env

const express = require('express')
const app = express()

// configuraciones del servidor
app.set('view engine', 'hbs');

// modulos internos
const allLessons = require("./data/somedata.js")

// APIs
const DogApi = require('doggo-api-wrapper');
const myDog = new DogApi();

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

app.get("/lessons/:bootcamp", (req, res) => {

  // req.params
  const {bootcamp} = req.params // "web", "cyber", "ux"
  // allLessons
  // allLessons.bootcamp ??? => filtrar solo los bootcamps que necesitamos
  const filteredLessson = allLessons.filter((eachLesson) => {
    return eachLesson.bootcamp === bootcamp
  })
  console.log(filteredLessson)
  // crear la vista

  // res.render
  res.render(__dirname + "/views/all-lessons.hbs", {
    allLessons: filteredLessson
  })

})

app.get("/random-dog", (req, res) => {

  // ?
  myDog.getARandomDog()
  .then(data => {
    // ...
    let {message} = data
    res.render(__dirname + "/views/random-dog.hbs", { message })
    // console.log(data)
  })
  .catch(err => console.error(err))
  // ?


})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})