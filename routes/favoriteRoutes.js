const express = require('express')
const router = express.Router()
const {
  getFavorites,
  createFavorite,
  deleteFavorite,
} = require('../controllers/favoriteControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getFavorites)
router.post('/', protect, createFavorite)
router.delete('/:id', protect, deleteFavorite)

module.exports = router
