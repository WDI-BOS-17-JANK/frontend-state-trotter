require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

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
  if (event) { event.preventDefault() }
  console.log('Starting onGetItems and region is ', region)
  api.getItems()
    .then((data) => {
      ui.getItemsSuccess(data, region)
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
  event.preventDefault()
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
    showTooltip: true,
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

module.exports = {
  addHandlers,
  usMap,
  myGoals,
  onShowItem,
  // onCreateItem,
  onUpdateItem
}
