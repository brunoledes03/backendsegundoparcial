const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Debe indicar un nombre de usuario'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Debe indicar un correo electrónico'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Debe indicar una contraseña'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)