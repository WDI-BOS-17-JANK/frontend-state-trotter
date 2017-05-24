require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

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
  event.preventDefault()
  api.getItems()
    .then((data) => {
      ui.getItemsSuccess(data, region)
    })
    .then(() => {
      $('#back-to-map-button').on('click', goBacktoMap)
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

// const onCreateItem = function (event) {
//   console.log('inside events/onCreateItem')
//   event.preventDefault()
//   const content = getFormFields(event.target)
//   api.createItem(content)
//     .then(ui.createItemSuccess)
//     .catch(ui.createItemFailure)
// }

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
  // onCreateItem,
  onUpdateItem
}
