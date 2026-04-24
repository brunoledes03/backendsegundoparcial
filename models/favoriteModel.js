const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    heroId: {
      type: String,
      required: [true, 'Debe indicar el ID del héroe'],
    },
    name: {
      type: String,
      required: [true, 'Debe indicar el nombre del héroe'],
    },
    category: {
      type: String,
      default: 'Favorito',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Favorite', favoriteSchema)
