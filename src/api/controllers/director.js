const Director = require('../models/director')
const mongoose = require('mongoose')
const { cloudinary } = require('../../config/cloudinary')

// CREATE
const createDirector = async (req, res) => {
  try {
    const newDirector = new Director(req.body)

    if (req.body.movies) {
      newDirector.movies = JSON.parse(req.body.movies)
    }

    if (req.file) {
      newDirector.img = req.file.path
    }

    const directorSaved = await newDirector.save()

    return res.status(201).json(directorSaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al crear director')
  }
}

// READ
const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find().populate('movies')

    return res.status(200).json(directors)
  } catch (error) {
    return res.status(400).json('Error al obtener directors')
  }
}

// UPDATE
const updateDirector = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido')
    }

    const directorToUpdate = await Director.findById(id)

    if (!directorToUpdate) {
      return res.status(404).json('Director no encontrado')
    }

    if (req.body.movies) {
      const parsedMovies = JSON.parse(req.body.movies)

      const currentMovies = directorToUpdate.movies.map((movie) =>
        movie.toString()
      )

      const newMovies = parsedMovies.filter(
        (movie) => !currentMovies.includes(movie)
      )

      directorToUpdate.movies.push(...newMovies)
    }

    if (req.file) {
      if (directorToUpdate.img) {
        const imgName = directorToUpdate.img.split('/').pop().split('.')[0]

        await cloudinary.uploader.destroy(
          `${process.env.CLOUDINARY_FOLDER}/${imgName}`
        )
      }

      directorToUpdate.img = req.file.path
    }

    directorToUpdate.name = req.body.name || directorToUpdate.name

    directorToUpdate.country = req.body.country || directorToUpdate.country

    await directorToUpdate.save()

    const directorUpdated = await Director.findById(id).populate('movies')

    return res.status(200).json(directorUpdated)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al actualizar director')
  }
}

// DELETE
const deleteDirector = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json('ID no válido')
    }

    const directorDeleted = await Director.findByIdAndDelete(id)

    if (!directorDeleted) {
      return res.status(404).json('Director no encontrado')
    }

    if (directorDeleted.img) {
      const imgName = directorDeleted.img.split('/').pop().split('.')[0]

      await cloudinary.uploader.destroy(
        `${process.env.CLOUDINARY_FOLDER}/${imgName}`
      )
    }

    return res.status(200).json(directorDeleted)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al borrar director')
  }
}

module.exports = {
  createDirector,
  getDirectors,
  updateDirector,
  deleteDirector
}
