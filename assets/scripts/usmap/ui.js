'use strict'
// const showLandingTemplate = require('../templates/landing.handlebars')
// const showMapTemplate = require('../templates/map.handlebars')
// const showStateAllTemplate = require('../templates/state-all-items.handlebars')
// const showStateItemCreateTemplate = require('../templates/state-item-create.handlebars')
// const showStateItemDetailsTemplate = require('../templates/state-item-details.handlebars')
// const showStateItemUpdateTemplate = require('../templates/state-item-update.handlebars')

const getItemsSuccess = (data, region) => {
  // console.log(data)
  // console.log('inside getItemsSucces region is', region)
  const result = data.items.filter((item) => {
    return item.state === region
  })
  console.log(result)
}

const getItemsFailure = (data) => {
  console.error(data)
}

const createItemSuccess = (data) => {
  console.log(data)
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
  destroyItemSuccess
}
