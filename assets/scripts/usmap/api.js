'use strict'

const config = require('../config.js')
const store = require('../store.js')

// GET
const getItems = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/items',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createItem = function (content) {
  console.log('inside api/createItem and the content is', content)
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/items',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      item: {
        description: content.item.description,
        due_date: content.item.due_date,
        state: content.item.state,
        status: 'incomplete',
        title: content.item.title,
        category: content.item.category,
        location: content.item.location
      }
    }
  })
}

const updateItem = function (content) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/items/' + content.item.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      item: {
        description: content.item.description,
        due_date: content.item.due_date,
        status: content.item.status,
        title: content.item.title,
        category: content.item.category,
        location: content.item.location
      }
    }
  })
}

const destroyItem = function (content) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/items/' + content.item.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const saveEdit = function (newContent, id) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/items/' + id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      item: {
        description: newContent.items.description,
        due_date: newContent.items.due_date,
        status: newContent.items.status,
        title: newContent.items.title,
        category: newContent.items.category,
        location: newContent.items.location
      }
    }
  })
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  destroyItem,
  saveEdit
}
