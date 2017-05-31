'use strict'

require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const store = require('../store.js')
const formatDate = require('./formatDate.js')

// templates
const addItemToList = require('../templates/add-item-to-list.handlebars')
const allGoals = require('../templates/all-goals.handlebars')
const nextGoal = require('../templates/next-goal.handlebars')
const stateDefaultItem = require('../templates/state-default-item.handlebars')
const backToMapTemplate = require('../templates/back-to-map.handlebars')

const updateAfterEditSuccess = (data) => {
  const $list = $('#item-list').children('.checkbox-item').children('button')
  const $buttonToUpdate = $list.filter((x, e, a) => {
    const current = $(e).attr('data-id')

    return current === data.item._id
  })
  const addItemToListHtml = addItemToList({item: data.item})
  const $checkBoxToUpdate = $buttonToUpdate.parents('.checkbox-item')
  $($checkBoxToUpdate).replaceWith(addItemToListHtml)
}

const updateAfterEditFailure = (error) => {

}
const saveEditFailure = (error) => {

}

const hideMap = () => {
  $('#map-view-container').hide()
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
  $('#back-to-map-container').html(backToMapTemplate)
  // $('#back-to-map-button').on('click', goBacktoMap)
  return filteredItems
}

const getItemsFailure = (data) => {

}

const getmyGoalsSuccess = (data) => {
  const sortedData = data.items.sort(function (a, b) {
    a = new Date(a.due_date)
    b = new Date(b.due_date)
    return a > b ? 1 : a < b ? -1 : 0
  })

  const incompleteItems = sortedData.filter((item) => {
    return item.status === 'incomplete'
  })

  if (incompleteItems.length > 0) {
    const nextIncompleteItem = incompleteItems[0]

    nextIncompleteItem.due_date = formatDate(nextIncompleteItem.due_date)

    $('#next-goal').html(nextGoal({item: nextIncompleteItem}))
    $('#goal-column-0').empty()
    $('#goal-column-1').empty()
    $('#goal-column-2').empty()
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
}

const createItemSuccess = (data) => {
  // Push newly created item into the currentItems object. Now it is an object of all items (in an array), including new ones.
  store.currentItems.items.push(data.item)
  // form disappears on sucsess
  $('#create-item').remove()
  return data
}

const createItemFailure = (data) => {

}

const getItemSuccess = (data) => {
  data.item.due_date = formatDate(data.item.due_date)
  data.item.createdAt = formatDate(data.item.createdAt)
  $('#create-item-container').html(stateDefaultItem({item: data.item}))
  $('.detail-header').text('Selected Item:')
}

const getItemFailure = (data) => {
}

const updateItemSuccess = (data) => {

}

const updateItemFailure = (data) => {

}

const destroyItemSuccess = (data) => {

}

const destroyItemFailure = (data) => {

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
  getAttribute,
  getmyGoalsSuccess,
  getmyGoalsFailure,
  saveEditFailure,
  updateAfterEditFailure,
  updateAfterEditSuccess
}
