const express = require('express')
const passport = require('passport')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const FileUpload = require('../models/file_upload')

const fileUploadApi = require('../../lib/fileUploadApi')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /fileUploads
router.get('/fileUploads', (req, res, next) => {
  FileUpload.find()
    .then(fileUploads => {
      return fileUploads.map(fileUpload => fileUpload.toObject())
    })
    .then(fileUploads => res.status(200).json({ fileUploads: fileUploads }))
    .catch(next)
})

// SHOW
// GET /fileUploads/5a7db6c74d55bc51bdf39793
router.get('/fileUploads/:id', (req, res, next) => {
  FileUpload.findById(req.params.id)
    .then(handle404)
    .then(fileUpload => res.status(200).json({ fileUpload: fileUpload.toObject() }))
    .catch(next)
})

// CREATE
// POST /fileUploads
router.post('/fileUploads', requireToken, upload.single('upload'), (req, res, next) => {
  req.file.owner = req.user.id
  fileUploadApi(req.file)
    .then(s3Response => {
      const fileUploadParams = {
        name: s3Response.Key,
        fileType: req.file.mimetype,
        url: s3Response.Location,
        user: req.user
      }
      return FileUpload.create(fileUploadParams)
    })
    .then(mongooseResponse =>
      res.status(201).json({ fileUpload: mongooseResponse.toObject() }))
    .catch(next)
})

// UPDATE
// PATCH /fileUploads/5a7db6c74d55bc51bdf39793
router.patch('/fileUploads/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.user

  FileUpload.findById(req.params.id)
    .then(handle404)
    .then(fileUpload => {
      requireOwnership(req, fileUpload)

      return fileUpload.updateOne(req.body.fileUpload)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /fileUploads/5a7db6c74d55bc51bdf39793
router.delete('/fileUploads/:id', requireToken, (req, res, next) => {
  FileUpload.findById(req.params.id)
    .then(handle404)
    .then(fileUpload => {
      requireOwnership(req, fileUpload)
      fileUpload.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
