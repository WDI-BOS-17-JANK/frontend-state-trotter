'use strict'
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

module.exports = {
  getItemsSuccess,
  getItemsFailure
}
