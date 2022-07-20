require('dotenv').config() // esto nos permite acceder a las variables env

const express = require('express')
const app = express()

// configuraciones del servidor
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views/")

// configuracion para partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + "/views/partials")

// modulos internos
const allLessons = require("./data/somedata.js")

// APIs
const DogApi = require('doggo-api-wrapper');
const myDog = new DogApi();

app.get('/', (req, res) => {
  // res.send('Hello World!')

  // aqui haremos una magia para acceder a data de una BD


  res.render("home.hbs", {
    teacherName: "Jorge"
  }) // la data a pasar siempre debe ser un Objeto

})

app.get("/lessons", (req, res) => {

  // aqui yo le quiero renderizar al usuario una vista con todas las lecciones
  // ya tengo acceso a la data como allLessons
  // me enfoco en renderizar la vista
  res.render("all-lessons.hbs", {
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
  res.render("all-lessons.hbs", {
    allLessons: filteredLessson
  })

})

app.get("/random-dog", (req, res) => {

  myDog.getARandomDog()
  .then(data => {
    // ...
    let {message} = data
    res.render("random-dog.hbs", { message })
    // console.log(data)
  })
  .catch(err => console.error(err))

})

app.get("/breeds", (req, res) => {
  myDog.getListOfAllBreeds()
  .then(data => {

    const {message} = data
    // Object.keys() => crear un arra con todos los nombres de propiedades de un objeto
    let breedsArr = Object.keys(message)
    console.log(breedsArr)

    // console.log(data)
    res.render("list-of-breeds.hbs", {
      breedsArr
    })
  })
  .catch(err => console.error(err))
})

app.get("/dog/:breed", (req, res) => {

  const {breed} = req.params
  console.log(breed)

  myDog.getAllDogsByBreed(breed)
  .then(data => {
    
    const { message } = data
    console.log(message)
    
    res.render("dogs-by-breed.hbs", {
      dogs: message
    })
  })
  .catch(err => console.error(err))



})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
