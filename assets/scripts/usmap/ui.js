'use strict'

require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const store = require('../store.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
// const onCreateItem = require('./events')
// const showLandingTemplate = require('../templates/landing.handlebars')
const addItemToList = require('../templates/add-item-to-list.handlebars')
const showStateAllTemplate = require('../templates/state-all-items.handlebars')
const showStateItemCreateTemplate = require('../templates/state-item-create.handlebars')

const showStateView = (items) => {
  const itemByState = showStateAllTemplate(items)
  $('#state-view').append(itemByState)
  createFormHandler()
}

const showCreateform = () => {
  $('#create-item-container').append(showStateItemCreateTemplate)
  $('#create-item').on('submit', onCreateItem)
}

const createFormHandler = () => {
  $('#create-button').on('click', showCreateform)
}

const hideMap = () => {
  $('#map-view-container').empty()
}

const getItemsSuccess = (data, region) => {
  // 'item' below has to be 'item' in state-all-items.handlebars
  showStateView({items: data.items})
  const result = data.items.filter((item) => {
    return item.state === region
  })
  console.log('result at getItemSuccess is', result)
  console.log('what is state at getItemSuccess?', region)
  store.state = region
  hideMap()
  console.log('store.state in getItemSuccess is', store.state)
  $('#state-header').text(store.state)
}

const getItemsFailure = (data) => {
  console.error(data)
}

const onCreateItem = function (event) {
  event.preventDefault()
  const content = getFormFields(event.target)

  const newData = {
    item: {
      description: content.item.description,
      due_date: content.item.due_date,
      state: store.state,
      status: content.item.status,
      title: content.item.title,
      category: content.item.category,
      location: content.item.location
    }
  }

  api.createItem(newData)
    .then(createItemSuccess)
    // pass in 'data' from createItemSuccess, call it 'newItem'
    .then((newItem) => {
      console.log(newItem)
      // Pass in newly created item into add-item-to-list.handlebars
      const newItemHtml = addItemToList({item: newItem.item})
      // append this new html to #new-item-container in state-all-items.handlebars
      $('#new-item-container').append(newItemHtml)
    })
    .catch(createItemFailure)
}

const createItemSuccess = (data) => {
  console.log('response is', data)
  // disappear form on sucess
  $('#create-item').remove()
  return data
}

const createItemFailure = (data) => {
  console.error(data)
}

const updateItemSuccess = (data) => {
  console.log(data)
}

const updateItemFailure = (data) => {
  console.error(data)
}

const destroyItemSuccess = (data) => {
  console.log(data)
}

const destroyItemFailure = (data) => {
  console.error(data)
}

module.exports = {
  getItemsSuccess,
  getItemsFailure,
  createItemSuccess,
  createItemFailure,
  updateItemSuccess,
  updateItemFailure,
  destroyItemFailure,
  destroyItemSuccess,
  createFormHandler
}
