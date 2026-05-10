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

    const directorUpdated = await Director.findByIdAndUpdate(id, req.body, {
      new: true
    }).populate('movies')

    if (!directorUpdated) {
      return res.status(404).json('Director no encontrado')
    }

    return res.status(200).json(directorUpdated)
  } catch (error) {
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
