'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
require('./jquery.vmap.js')
require('./jquery.vmap.usa.js')
const authEvents = require('./auth/events.js')
// const flashcardEvents = require('./flashcard/events.js')
const usmap = function () {
  $('#vmap').vectorMap({ map: 'usa_en' })
}

$(() => {
  authEvents.addHandlers()
  usmap()
  // flashcardEvents.addFlashcardHandlers()
})
