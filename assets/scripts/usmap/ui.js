'use strict'

require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const store = require('../store.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
// const ui = require('./ui')
// const onCreateItem = require('./events')
// const showLandingTemplate = require('../templates/landing.handlebars')
const addItemToList = require('../templates/add-item-to-list.handlebars')
const showStateAllTemplate = require('../templates/state-all-items.handlebars')
const showStateItemCreateTemplate = require('../templates/state-item-create.handlebars')
const allGoals = require('../templates/all-goals.handlebars')
const nextGoal = require('../templates/next-goal.handlebars')
const mapPage = require('../templates/map.handlebars')
const mapEvents = require('./events')


const showStateView = (items) => {
  const itemByState = showStateAllTemplate(items)
  $('#state-view').append(itemByState)
  createFormHandler()
  $('#state-header').text(store.state)
  console.log('store.state is', store.state)
}

const cancelCreate = () => {
  $('#create-item-container').empty('')
  // enable '+' (add new item) button once upon clicking 'cancel'
  // $('#create-button').prop('disabled', false)
}

const showCreateform = () => {
  $('#create-item-container').append(showStateItemCreateTemplate)
  // remove create form upon clicking 'create'
  $('#cancel-create').on('click', cancelCreate)
  // // disable '+' (add new item) button upon clicking
  // $('#create-button').prop('disabled', true)
  $('#create-item').on('submit', onCreateItem)
}

const createFormHandler = () => {
  $('#create-button').on('click', showCreateform)
}

const hideMap = () => {
  // $('#map-view-container').empty()
  $('#map-view-container').hide()
}

const getItemsSuccess = (data, region) => {
  store.state = region

  const filteredItems = data.items.filter((item) => {
    return item.state === region
  })
  hideMap()
  // 'item' below has to be 'item' in state-all-items.handlebars
  // We need to pass filteredItems to showStateView rather than data.items
  showStateView({items: filteredItems})
  hideMap()
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

const getmyGoalsSuccess = (data) => {
  console.log('in getmyGoalsSuccess and data is', data)

  const sortedData = data.items.sort(function (a, b) {
    a = new Date(a.due_date)
    b = new Date(b.due_date)
    return a > b ? 1 : a < b ? -1 : 0
  })

  const incompleteItems = sortedData.filter((item) => {
    return item.status === 'incomplete'
  })
  console.log('incompleteItems is', incompleteItems)

  const nextIncompleteItem = incompleteItems[0]
  console.log('nextIncompleteItem is', nextIncompleteItem)

  const date = new Date(nextIncompleteItem.due_date)

  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()

  const forDisplay = month + '/' + day + '/' + year
  console.log('THE DATE IS NOW', forDisplay)

  nextIncompleteItem.due_date = forDisplay

  $('#next-goal').append(nextGoal({item: nextIncompleteItem}))

  sortedData.forEach((item, i) => {
    if (i % 3 === 0) {
      $('#goal-column-0').append(allGoals({
        item: item
      }))
    } else if (i % 3 === 1) {
      $('#goal-column-1').append(allGoals({
        item: item
      }))
    } else if (i % 3 === 2) {
      $('#goal-column-2').append(allGoals({
        item: item
      }))
    }
  })
}

const getmyGoalsFailure = (data) => {
  console.error(data)
}

const createItemSuccess = (data) => {
  // enable '+' (add new item) button upon successful item create
  // $('#create-button').prop('disabled', false)
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
  getmyGoalsSuccess,
  getmyGoalsFailure,
  createFormHandler
}
