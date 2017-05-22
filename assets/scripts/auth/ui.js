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

  // don't use event.preventDefault() or else won't work
//   flashcardapi.getFlashcards()
//     .then(flashcardui.getFlashcardsSuccess)
//     .catch(flashcardui.getFlashcardsFailure)
}

const signInFailure = () => {
  $('.signin-status-message').text('Wrong username and or password.')
}

const changePasswordSuccess = (response) => {
  $('.change-pw-status-message').text('Password changed successfully.')
}

const changePasswordFailure = () => {
  $('.change-pw-status-message').text('Password could not be changed. Please try again.')
}

const signOutSuccess = () => {
  $('.header').fadeIn()
  $('.flashcard-container').hide()
  $('.flashcard-container-header').hide()
  $('footer').hide()
  $('#view-all').hide()
  document.getElementById('change-password').reset()
  $('.change-pw-status-message').text('')

  if ($('input[name=hamburger-menu').is(':checked')) {
    $('input[name=hamburger-menu]').click()
  }
  // scroll back to top of landing page upon successful signout
  $(document).ready(function () {
    window.scrollTo(0, 0)
  })

  store.user = null // only have one person signed in in a givne session, one browser
}

const signOutFailure = () => {
  $('#content-status-message').text('Something went wrong. Please try again.')
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
