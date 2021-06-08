const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  favoritedBy: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  }]
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note