const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    country: { type: String, required: true },

    img: { type: String, required: true },

    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Director = mongoose.model('directors', directorSchema)

module.exports = Director
