const mongoose = require('mongoose')
require('./user')

const fileUploadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Owner',
    required: true
  },
  tag: {
    type: String
  }
}, {
  timestamps: true
})

const FileUpload = mongoose.model('FileUpload', fileUploadSchema)

module.exports = FileUpload
