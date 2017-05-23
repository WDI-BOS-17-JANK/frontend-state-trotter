'use strict'
const mapPage = require('../templates/map.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)
const mapEvents = require('../usmap/events.js')
const api = require('./api')
const ui = require('./ui')
const mainPageNav = require('../templates/main-page-nav.handlebars')
const store = require('../store.js')
// const board = require('../board')

const onSignUp = function (event) {
  const data = getFormFields(this) // this will refer to event.target because it gets passed into addHandlers as a callback.
  event.preventDefault()
  // api.signUp(data) // check the api.js file to see. When successful, show signUpSucess message, otherwise, signUpFailure message
  //   .then(ui.signUpSuccess)
  //   .catch(ui.signUpFailure)
  api.signUp(data) // check the api.js file to see. When successful, show signUpSucess message, otherwise, signUpFailure message
    .then(ui.signUpSuccess)
    .then(() => {
      api.signIn(data)
        .then(ui.signInSuccess)
        .catch(ui.signInFailure)
    })
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) { // stop here , add console to check if code is working so far
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addLandingHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#modal-signin').on('hidden.bs.modal', function () {
    console.log('store.user is ', store.user)
    if (store.user !== undefined) {
      $('#landing-view-container').html('')
      $('#main-view-container').html(mainPageNav)
      $('#map-view-container').html(mapPage)
      mapEvents.usMap()
    }
  })
  // $('#change-password').on('submit', onChangePassword)
  // $('#sign-out').on('submit', onSignOut)
}

module.exports = {
  addLandingHandlers
}
