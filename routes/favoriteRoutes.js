const express = require('express')
const router = express.Router()
const {
  getFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} = require('../controllers/favoriteControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getFavorites)
router.post('/', protect, createFavorite)
router.put('/:id', protect, updateFavorite)
router.delete('/:id', protect, deleteFavorite)

module.exports = router
