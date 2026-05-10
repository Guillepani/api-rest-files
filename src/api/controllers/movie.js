const Movie = require('../models/movie')
const mongoose = require('mongoose')
const { cloudinary } = require('../../config/cloudinary')

// CREATE
const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body)

    if (req.file) {
      newMovie.img = req.file.path
    }

    const movieSaved = await newMovie.save()

    return res.status(201).json(movieSaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al crear movie')
  }
}

// READ
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()

    return res.status(200).json(movies)
  } catch (error) {
    return res.status(400).json('Error al obtener movies')
  }
}

// UPDATE
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido')
    }

    const movieUpdated = await Movie.findByIdAndUpdate(id, req.body, {
      new: true
    })

    if (!movieUpdated) {
      return res.status(404).json('Movie no encontrada')
    }

    return res.status(200).json(movieUpdated)
  } catch (error) {
    return res.status(400).json('Error al actualizar movie')
  }
}

// DELETE
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido')
    }

    const movieDeleted = await Movie.findByIdAndDelete(id)

    if (!movieDeleted) {
      return res.status(404).json('Movie no encontrada')
    }

    if (movieDeleted.img) {
      const imgName = movieDeleted.img.split('/').pop().split('.')[0]

      await cloudinary.uploader.destroy(
        `${process.env.CLOUDINARY_FOLDER}/${imgName}`
      )
    }

    return res.status(200).json(movieDeleted)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al borrar movie')
  }
}

module.exports = {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie
}
