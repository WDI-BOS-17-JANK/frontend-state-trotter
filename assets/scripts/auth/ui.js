'use strict'
//
// const flashcardapi = require('../flashcard/api')
// const flashcardui = require('../flashcard/ui')

const store = require('../store.js')


const signUpSuccess = (response) => { // argument can be (response) or something too. Just an argument name
  // $('.signup-status-message').text('Successfully signed up. Please wait for page to load.')
  $('#modal-signup').modal('hide')
  document.getElementById('sign-up').reset()

  store.user = response.user // response.user is the email id and token // stores whatever that was in that response
  // event.preventDefault() // don't use this or else won't work
  // flashcardapi.getFlashcards()
  //   .then(flashcardui.getFlashcardsSuccess)
  //   .catch(flashcardui.getFlashcardsFailure)
}

const signUpFailure = () => {
  $('.signup-status-message').text('Username taken or the passwords do not match. Please try again.')
}

const signInSuccess = (response) => { // argument can be (response) or something too. Just an argument name
  console.log(response)
  $('#modal-signin').modal('hide')
  document.getElementById('sign-in').reset()
  // In case someone clicks 'back' in browser while siebar still open, then goes forward again to the page, and signs in.
  store.user = response.user // response.user is the email id and token // stores whatever that was in that response
  console.log('signInSuccess complete')
}

const signInFailure = () => {
  // $('.signin-status-message').text('Wrong username and or password.')
  console.log('Sign in failure.')
}

const changePasswordSuccess = (response) => {
  // $('.change-pw-status-message').text('Password changed successfully.')
  console.log('Password changed successfully.')
}

const changePasswordFailure = () => {
  // $('.change-pw-status-message').text('Password could not be changed. Please try again.')
  console.log('Password could not be changed. Please try again.')
}

const signOutSuccess = () => {
  console.log('sign out successful')
  store.user = null // only have one person signed in in a givne session, one browser
}

const signOutFailure = () => {
  // $('#content-status-message').text('Something went wrong. Please try again.')
  console.log('Something went wrong. Please try again.')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
