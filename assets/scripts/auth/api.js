'use strict'

const config = require('../config.js')
const store = require('../store.js')

const signUp = (data) => {
  // to check to see what data gives us, structure
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST', // has to be a string
    data // this line is same as data: data. Need a new key on this object, just calling it data
  })
} // an object we'll pass into as an ajax request

const signIn = (data) => { // data object passed into  argument will be different from argument in above function
  console.log('in signIn and the data is ', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST', // has to be a string
    data
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH', // has to be a string
    headers: { // headers always plural by default // look at curl for this
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE', // has to be a string
    headers: { // headers always plural by default // look at curl for this
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
// doesn't have to be arrows
