const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
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
    title: {
      type: String,
      required: [true, 'Debe indicar un título para la nota'],
    },
    content: {
      type: String,
      required: [true, 'Debe indicar el contenido de la nota'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)