require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')

// const getFormFields = require(`../../../lib/get-form-fields`)

// const api = require('./api')
// const ui = require('./ui')

// const onGetItems = function (event) {
//   console.log('inside onGetItems')
//   event.preventDefault()
//   api.getItems()
//     // .then(ui.getItemsSuccess)
//     // .catch(ui.getItemsFailure)
// }

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
    // const message = 'You clicked "'
    //     + region
    //     + '" which has the code: '
    //     + code.toUpperCase();
    //
    // alert(message);
      console.log('element is ', element)
      console.log('code is ', code)
      console.log('region is ', region)
    }
  })
}

// const addFlashcardHandlers = () => {
//   $('#create-flashcard').on('submit', onCreateFlashcard)
//   // $('#get-flashcard').on('submit', onGetFlashcard)
//   $('#get-flashcards').on('submit', onGetFlashcards)
//   $('#update-card-button').on('click', onClickUpdateButton)
//   $('#create-card-button').on('click', onClickCreateButton)
// }

module.exports = {
  // onGetItems,
  usMap
}
