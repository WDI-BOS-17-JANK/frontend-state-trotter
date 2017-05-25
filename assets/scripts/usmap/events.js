require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const store = require('../store.js')
const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const formatDate = require('./formatDate.js')

// templates
const editFormTemplate = require('../templates/state-item-update.handlebars')
const showStateItemCreateTemplate = require('../templates/state-item-create.handlebars')
const addItemToList = require('../templates/add-item-to-list.handlebars')
const showStateAllTemplate = require('../templates/state-all-items.handlebars')
const stateDefaultItem = require('../templates/state-default-item.handlebars')

const deleteItem = function (event) {
  console.log('in delete item and event.target is ', $(event.target).attr('data-id'))
  console.log('in delete item and region is ', $(event.target).attr('data-state'))
  const id = $(event.target).attr('data-id')
  const region = $(event.target).attr('data-state')
  onDestroyItem(id, region)
}

const showSelectedItem = (event) => {
  console.log('inside showSelectedItem and event is', event.target)
  // on click of the display button ('#display-button'),
  // display the state-default items handlebar
  const id = $(event.target).attr('data-id')
  console.log('id is ', id)
  api.showItem(id)
  .then(ui.getItemSuccess)
  .catch(ui.getItemsFailure)
}

const goBacktoMap = () => {
  // alert('inside goBacktoMap')
  // $('#map-view-container').html(mapPage)
  // console.log('mapEvents is', mapEvents)
  // mapEvents.usMap()
  $('#back-to-map-container').empty()
  $('#state-view').empty()
  $('#map-view-container').fadeIn()
  event.preventDefault()
  api.getItems()
    .then((data) => {
      ui.getmyGoalsSuccess(data)
    })
    .catch(ui.getmyGoalsFailure)
}

const onGetItems = function (element, code, region) {
  $('.status-message').text(region)
  if (event) { event.preventDefault() }
  console.log('Starting onGetItems and region is ', region)
  api.getItems()
    .then((data) => {
      return ui.getItemsSuccess(data, region)
    })
    .then((filteredItems) => {
      showStateView({items: filteredItems})
    })
    .then(() => {
      $('.display-details-button').on('click', showSelectedItem)
    })
    .then(() => {
      $('#back-to-map-button').on('click', goBacktoMap)
    })
    .then(() => {
      $('.delete-button').off('click', deleteItem)
      $('.delete-button').on('click', deleteItem)
    })
    .catch(ui.getItemsFailure)
}

const myGoals = function () {
  api.getItems()
    .then((data) => {
      ui.getmyGoalsSuccess(data)
    })
    .then(usMap)
    .catch(ui.getmyGoalsFailure)
}

const onShowItem = function (element, code, region) {
  event.preventDefault()
  const item = getFormFields(event.target).item
  api.showItem(item.id)
      .then(ui.showItemSuccess)
      .then((data) => {
        ui.showItemSuccess(data, region)
      })
      .catch(ui.showItemFailure)
}

const onUpdateItem = function (event) {
  console.log(event)
  const content = getFormFields(event.target)
  event.preventDefault()
  api.updateItem(content)
    .then(ui.updateItemSuccess)
    .catch(ui.updateItemFailure)
}

const onDestroyItem = function (id, region) {
  // const content = getFormFields(event.target)
  event.preventDefault()
  api.destroyItem(id)
    .then(ui.destroyItemSuccess)
    .then(() => {
      onGetItems(1, 1, region)
    })
    .catch(ui.destroyItemFailure)
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
    .then(ui.createItemSuccess)
    .then(() => {
      onGetItems(1, 1, newData.item.state)
    })
    // .then(showStateView)
    .catch(ui.createItemFailure)
}

const cancelCreate = () => {
  // console.log('store in cancelCreate is', store)
  // console.log('store.currentItems in cancelCreate is', store.currentItems)
  // store.currentItems here contains all items including newly created item (see createItemSuccess). Pass in this new object to refresh the list of all items on left pane (in state view)
  onGetItems(1, 1, store.state)
  $('#state-header').text(store.state)
}

const cancelUpdate = () => {
  showStateView(store.currentItems)
  // $('#state-header').text(store.state)
  onGetItems(1, 1, store.state)
}

const onSaveEdit = (event) => {
  const id = $(event.target).attr('data-id')
  const newContent = getFormFields(event.target)
  event.preventDefault()
  api.saveEdit(newContent, id)
    .then((data) => {
      return api.updateAfterEdit(id)
    })
    .then(() => {
      onGetItems(1, 1, $(event.target).attr('data-state'))
    })
    .catch(ui.saveEditFailure)
    .then(ui.updateAfterEditSuccess)
    .then(createFormHandler)
    .catch(ui.updateAfterEditFailure)
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
  const placeHolders = ui.getAttribute(event.target, attributes)
  const date = new Date(placeHolders['data-date'])
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  const forDisplay = month + '/' + day + '/' + year
  placeHolders['data-date'] = forDisplay
  const editFormHtml = editFormTemplate({item: placeHolders})
  $('#create-item-container').html(editFormHtml)
  editHandlers()
  $('#cancel-update').on('click', cancelUpdate)
}

const showStateView = (items) => {
  console.log('in showstateview items is', items)
  store.currentItems = items
  const sortedData = items.items.sort(function (a, b) {
    a = new Date(a.due_date)
    b = new Date(b.due_date)
    return a > b ? 1 : a < b ? -1 : 0
  })
  const sortedDataObject = {items: sortedData}
  const itemByState = showStateAllTemplate(sortedDataObject)
  $('#state-view').html(itemByState)
  createFormHandler()
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

// Change the styling, click event, and hover effects of the map by altering code below
const usMap = function () {
  $('#vmap').vectorMap({
    map: 'usa_en',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    color: '#f4f3f0',
    enableZoom: true,
    hoverColor: '#c9dfaf',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#f4f3f0',
    selectedRegions: null,
    showTooltip: false,
    onRegionOver: function (element, code, region) {
      $('#map-tooltip').text(region)
    },
    onRegionClick: function (element, code, region) {
      console.log('what state did i click on?', region)
      onGetItems(element, code, region)
    }
  })
}

const addHandlers = () => {
  // $('#create-item').on('submit', onCreateItem)
  $('#item-update').on('submit', onUpdateItem)
  $('#item-destroy').on('submit', onDestroyItem)
}

const createFormHandler = () => {
  $('#create-button').off('click', showCreateform)
  $('#create-button').on('click', showCreateform)
  $('.edit-button').off('click', showEditForm)
  $('.edit-button').on('click', showEditForm)
}

const showCreateform = () => {
  $('#create-item-container').html(showStateItemCreateTemplate)
  $('#create-item').on('submit', onCreateItem)
  $('#cancel-create').on('click', cancelCreate)
}

const editHandlers = () => {
  $('#edit-item').on('submit', onSaveEdit)
}
module.exports = {
  addHandlers,
  usMap,
  myGoals,
  onShowItem,
  // onCreateItem,
  onUpdateItem
}
