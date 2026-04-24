const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')


const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
  res.status(200).json(notes)
})


const createNote = asyncHandler(async (req, res) => {
  const { heroId, name, title, content } = req.body

  if (!heroId || !name || !title || !content) {
    res.status(400)
    throw new Error('Por favor complete todos los campos')
  }

  const note = await Note.create({
    user: req.user.id,
    heroId,
    name,
    title,
    content,
  })

  res.status(201).json(note)
})


const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(404)
    throw new Error('Nota no encontrada')
  }

  
  if (note.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('No autorizado')
  }

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedNote)
})


const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(404)
    throw new Error('Nota no encontrada')
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('No autorizado')
  }

  await note.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
}