const lessons = [
  {
    topic: "Javascript",
    description: "Don't use var",
    bootcamp: "web",
    approved: true,
  },
  {
    topic: "Handlebars",
    description: "It's like html... but better!",
    bootcamp: "web",
    approved: true,
  },
  {
    topic: "Hacking 101",
    description: "How to hack someone's facebook",
    bootcamp: "cyber",
    approved: false,
  },
  {
    topic: "Designing",
    description: "How to add proper colors",
    bootcamp: "ux",
    approved: true,
  }
]

// exportamos este array => que pueda ser usado en cualquier lugar de mi codigo
module.exports = lessons

