require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onGetItems = function (element, code, region) {
  // event.preventDefault()
  api.getItems()
    .then((data) => {
      ui.getItemsSuccess(data, region)
    })
    .catch(ui.getItemsFailure)
}

const onCreateItem = function (event) {
  const content = getFormFields(event.target)
  event.preventDefault()
  api.createItem(content)
    .then(ui.createItemSuccess)
    .catch(ui.createItemFailure)
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
      onGetItems(element, code, region)
    }
  })
}

const addHandlers = () => {
  $('#item-create').on('submit', onCreateItem)
}

module.exports = {
  addHandlers,
  usMap,
  onCreateItem
}
