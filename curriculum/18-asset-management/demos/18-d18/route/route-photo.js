'use strict'

const multer = require('multer')
const dataDir = `${__dirname}/../data`
const Photo = require('../model/photo')
const upload = multer({ dest: dataDir })
const debug = require('debug')('cfgram:route-photo')
const errorHandler = require('../lib/error-handler')
const bearerAuth = require('../lib/bearer-auth-middleware')


module.exports = function(router) {
  router.post('/api/photo', bearerAuth, upload.single('image'), (req, res) => {
    debug('POST /api/photo')

    return Photo.upload(req)
    .then(photoData => new Photo(photoData).save())
    .then(pic => res.json(pic))
    .catch(err => errorHandler(err, req, res))
  })

  router.get('/api/photo/:_id', bearerAuth, (req, res) => {
    debug('GET /api/photo/:_id')

    return Photo.findById(req.params._id)
    .then(photo => res.json(photo))
    .catch(err => errorHandler(err, req, res))
  })

  router.get('/api/photo', bearerAuth, (req, res) => {
    debug('GET /api/photo')

    return Photo.find()
    .then(photos => res.json(photos.map(photo => photo._id)))
    .catch(err => errorHandler(err, req, res))
  })

  router.put('/api/photo/:_id', bearerAuth, upload.single('image'), (req, res) => {
    debug('PUT /api/route/:_id')


  })

  router.delete('/api/photo/:_id', bearerAuth, (req, res) => {
    debug('DELETE /api/route/:_id')

    
  })
}