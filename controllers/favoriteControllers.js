const asyncHandler = require('express-async-handler')
const Favorite = require('../models/favoriteModel')


const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id })
  res.status(200).json(favorites)
})


const createFavorite = asyncHandler(async (req, res) => {
  const { heroId, name, category, notes } = req.body

  if (!heroId || !name) {
    res.status(400)
    throw new Error('heroId y name son obligatorios')
  }

  const favorite = await Favorite.create({
    user: req.user.id,
    heroId,
    name,
    category,
    notes,
  })

  res.status(201).json(favorite)
})


const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id)
  
  if (!favorite) {
    res.status(404)
    throw new Error('Favorito no encontrado')
  }

  if (favorite.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('No autorizado')
  }

  await favorite.deleteOne()
  res.status(200).json({ id: req.params.id })
})

const updateFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id)
  
  if (!favorite) {
    res.status(404)
    throw new Error('Favorito no encontrado')
  }

  if (favorite.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('No autorizado')
  }

  const updatedFavorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedFavorite)
})

module.exports = {
  getFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite,
}
