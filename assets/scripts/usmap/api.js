'use strict'

const config = require('../config.js')
const store = require('../store.js')

// GET
const getItems = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/items/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getItems
}
