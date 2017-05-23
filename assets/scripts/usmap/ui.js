'use strict'

require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const store = require('../store.js')

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
// const onCreateItem = require('./events')
// const showLandingTemplate = require('../templates/landing.handlebars')
// const showMapTemplate = require('../templates/map.handlebars')
const showStateAllTemplate = require('../templates/state-all-items.handlebars')
const showStateItemCreateTemplate = require('../templates/state-item-create.handlebars')
// const showStateItemDetailsTemplate = require('../templates/state-item-details.handlebars')
// const showStateItemUpdateTemplate = require('../templates/state-item-update.handlebars')
const mapPage = require('../templates/map.handlebars')
const allGoals = require('../templates/all-goals.handlebars')
const nextGoal = require('../templates/next-goal.handlebars')

const getItemsSuccess = (data, region) => {
  // debugger
  $('#state-view').append(showStateAllTemplate)
  $('#state-view').append(showStateItemCreateTemplate)
  $('#create-item').on('submit', onCreateItem)
  // console.log(data)
  // console.log('inside getItemsSucces region is', region)
  const result = data.items.filter((item) => {
    return item.state === region
  })
  console.log('result at getItemSuccess is', result)
  console.log('what is state at getItemSuccess?', region)
  store.state = region
}

const onCreateItem = function(event) {
  console.log('what is store.state', store.state) // Michigan
  event.preventDefault()
  console.log('event.target at onCreateItem is', event.target)
  const content = getFormFields(event.target)
  console.log('inside ui/onCreateItem and the content is', content)

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

const getItemsFailure = (data) => {
  console.error(data)
}

const createItemSuccess = (data) => {
  console.log('response is', data)
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
  getmyGoalsFailure
  // nextGoal
}
