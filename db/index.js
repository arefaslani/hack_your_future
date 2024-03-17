const knex = require('knex')
const knexfConfig = require('../knexfile')

const db = knex(knexfConfig.development)

module.exports = db
