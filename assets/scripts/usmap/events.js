require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

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

const onGetItems = function (element, code, region) {
  event.preventDefault()
  console.log('Starting onGetItems!')
  api.getItems()
    .then((data) => {
      ui.getItemsSuccess(data, region)
    })
    .then(() => {
      $('.display-details-button').on('click', showSelectedItem)
    })
    .then(console.log('On Get Items complete!'))
    .catch(ui.getItemsFailure)
  console.log('On Get Items complete!2')
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
  const content = getFormFields(event.target)
  event.preventDefault()
  api.updateItem(content)
    .then(ui.updateItemSuccess)
    .catch(ui.updateItemFailure)
}

const onDestroyItem = function (event) {
  const content = getFormFields(event.target)
  event.preventDefault()
  api.destroyItem(content)
    .then(ui.destroyItemSuccess)
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
    selectedColor: '#c9dfaf',
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
