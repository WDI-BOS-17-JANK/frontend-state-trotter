'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const mapEvents = require('./usmap/events.js')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
require('./jquery.vmap.js')
require('./jquery.vmap.usa.js')
const authEvents = require('./auth/events.js')

// // Change the styling, click event, and hover effects of the map by altering code below
// const usmap = function () {
//   $('#vmap').vectorMap({
//     map: 'usa_en',
//     backgroundColor: 'rgba(0,0,0,0)',
//     borderColor: '#818181',
//     borderOpacity: 0.25,
//     borderWidth: 1,
//     color: '#f4f3f0',
//     enableZoom: true,
//     hoverColor: '#c9dfaf',
//     hoverOpacity: null,
//     normalizeFunction: 'linear',
//     scaleColors: ['#b6d6ff', '#005ace'],
//     selectedColor: '#c9dfaf',
//     selectedRegions: null,
//     showTooltip: true,
//     onRegionClick: function (element, code, region) {
//     // const message = 'You clicked "'
//     //     + region
//     //     + '" which has the code: '
//     //     + code.toUpperCase();
//     //
//     // alert(message);
//       console.log('element is ', element)
//       console.log('code is ', code)
//       console.log('region is ', region)
//     }
//   })
// }

$(() => {
  authEvents.addHandlers()
  mapEvents.usMap()
  // flashcardEvents.addFlashcardHandlers()
})
