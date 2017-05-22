'use strict'
const getItemsSuccess = (data, region) => {
  console.log(data)
  console.log('inside getItemsSucces region is', region)
}

const getItemsFailure = (data) => {
  console.error(data)
}
module.exports = {
  getItemsSuccess,
  getItemsFailure
}
