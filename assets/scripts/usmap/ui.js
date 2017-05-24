'use strict'

require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const store = require('../store.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const addItemToList = require('../templates/add-item-to-list.handlebars')
const showStateAllTemplate = require('../templates/state-all-items.handlebars')
const showStateItemCreateTemplate = require('../templates/state-item-create.handlebars')

const mapPage = require('../templates/map.handlebars')
const allGoals = require('../templates/all-goals.handlebars')
const nextGoal = require('../templates/next-goal.handlebars')
const stateDefaultItem = require('../templates/state-default-item.handlebars')


const formatDate = function (date) {
  const d = new Date(date)
  const month = d.getUTCMonth() + 1
  const day = d.getUTCDate()
  const year = d.getUTCFullYear()
  return month + '/' + day + '/' + year
}

const editFormTemplate = require('../templates/state-item-update.handlebars')

const showStateView = (items) => {
  const itemByState = showStateAllTemplate(items)
  $('#state-view').append(itemByState)
  createFormHandler()
  console.log('in showStateView and items is ', items)

  const sortedData = items.items.sort(function (a, b) {
    a = new Date(a.due_date)
    b = new Date(b.due_date)
    return a > b ? 1 : a < b ? -1 : 0
  })

  const incompleteItems = sortedData.filter((item) => {
    return item.status === 'incomplete'
  })
  console.log('incompleteItems is', incompleteItems)

  if (incompleteItems.length > 0) {
    const nextIncompleteItem = incompleteItems[0]
    nextIncompleteItem.due_date = formatDate(nextIncompleteItem.due_date)
    nextIncompleteItem.createdAt = formatDate(nextIncompleteItem.createdAt)
    console.log('nextIncompleteItem is', nextIncompleteItem)
    $('#create-item-container').html(stateDefaultItem({item: nextIncompleteItem}))
    console.log('no incomplete items')
  } else {
    showCreateform()
  }
}

const showCreateform = () => {
  $('#create-item-container').html(showStateItemCreateTemplate)
  $('#create-item').on('submit', onCreateItem)
}
// swap in the edit form template
const showEditForm = (event) => {
  const attributes = [
    'data-title',
    'data-category',
    'data-state',
    'data-status',
    'data-description',
    'data-location',
    'data-id',
    'data-date'
  ]
  const placeHolders = getAttribute(event.target, attributes)
  const date = new Date(placeHolders['data-date'])
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  const forDisplay = month + '/' + day + '/' + year
  placeHolders['data-date'] = forDisplay
  const editFormHtml = editFormTemplate({item: placeHolders})
  $('#create-item-container').html(editFormHtml)
  editHandlers()
}

const editHandlers = () => {
  $('#edit-item').on('submit', onSaveEdit)
}

const onSaveEdit = (event) => {
  const id = $(event.target).attr('data-id')
  const newContent = getFormFields(event.target)
  event.preventDefault()
  api.saveEdit(newContent, id)
    .then(saveEditSuccess)
    .catch(saveEditFailure)
}

const saveEditSuccess = (data) => {
  console.log('save edit success', data)
}

const saveEditFailure = (error) => {
  console.error(error)
}

const createFormHandler = () => {
  $('#create-button').on('click', showCreateform)
  $('.edit-button').on('click', showEditForm)
}

const hideMap = () => {
  $('#map-view-container').empty()
}

const getAttribute = ($button, array) => {
  const placeHolders = {}
  array.forEach((e) => {
    const val = $($button).attr(e)
    placeHolders[e] = val
  })
  return placeHolders
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
      status: 'incomplete',
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

  if (incompleteItems.length > 0) {
    const nextIncompleteItem = incompleteItems[0]
    console.log('nextIncompleteItem is', nextIncompleteItem)

    nextIncompleteItem.due_date = formatDate(nextIncompleteItem.due_date)

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
  } else {
    $('#next-goal').text('Add some goals before you sign out!')
  }
}


const getmyGoalsFailure = (data) => {
  console.error(data)
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

const getItemSuccess = (data) => {
  console.log(data)
  data.item.due_date = formatDate(data.item.due_date)
  data.item.createdAt = formatDate(data.item.createdAt)
  $('#create-item-container').html(stateDefaultItem({item: data.item}))
}

const getItemFailure = (data) => {
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
  getItemSuccess,
  getItemFailure,
  updateItemSuccess,
  updateItemFailure,
  destroyItemFailure,
  destroyItemSuccess,
  createFormHandler,
  getmyGoalsSuccess,
  getmyGoalsFailure
}
