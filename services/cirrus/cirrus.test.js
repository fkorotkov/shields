'use strict'

const Joi = require('joi')
const { isBuildStatus } = require('../build-status')
const t = (module.exports = require('../tester').createServiceTester())

t.create('cirrus bad repo')
  .get('/unknown-identifier/unknown-repo.json')
  .expectBadge({ label: 'build', message: 'not+found' })

t.create('cirrus fully.valid')
  .get('//.json') // TODO
  .expectBadge({
    label: 'build',
    message: Joi.alternatives().try(isBuildStatus, Joi.equal('unknown')),
  })
