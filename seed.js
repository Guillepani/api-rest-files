const mongoose = require('mongoose')
require('dotenv').config()

const Movie = require('./src/api/models/movie')
const Director = require('./src/api/models/director')

const movies = [
  {
    title: 'Interstellar',
    year: 2014,
    img: 'https://dummyimage.com/interstellar.jpg'
  },
  {
    title: 'Batman Begins',
    year: 2005,
    img: 'https://dummyimage.com/batman.jpg'
  }
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Movie.deleteMany()
    await Director.deleteMany()

    const createdMovies = await Movie.insertMany(movies)

    const directors = [
      {
        name: 'Christopher Nolan',
        country: 'UK',
        img: 'https://dummyimage.com/nolan.jpg',
        movies: [createdMovies[0]._id, createdMovies[1]._id]
      }
    ]

    await Director.insertMany(directors)

    console.log('Seed ejecutado correctamente')

    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

seed()
