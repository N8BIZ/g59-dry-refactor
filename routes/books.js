const knex = require('../lib/knex')
const express = require('express')
const router = express.Router()
const {find, create, update,
  deleteById, validateId} = require('../lib/books')

router.get('/', (req, res, next) => {
  find()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res, next) => {
  find(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

router.post('/', (req, res, next) => {
  create(req.body, '*')
    .then(book => res.send(book))
    .catch(err => res.status(500).send(err))
})

router.patch('/:id', (req, res, next) => {
  update(req.params.id)
    .then(book => {
      if (!book) return next()
      res.send(book)
    })
    .catch(err => res.status(500).send(err))
})

router.delete('/:id', (req, res, next) => {
  let book = null
  validateId(req.params)
    .then(find)
    .then(data => {
      book = data
      if (data && data.id) {
        deleteById(data.id)
      }
      return book
    })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router
