const express = require('express')

const {
  createDirector,
  getDirectors,
  updateDirector,
  deleteDirector
} = require('../controllers/director')

const upload = require('../../middlewares/file')

const router = express.Router()

router.get('/', getDirectors)
router.post('/', upload.single('img'), createDirector)
router.put('/:id', updateDirector)
router.delete('/:id', deleteDirector)

module.exports = router
