'use strict'
const formatDate = function (date) {
  const d = new Date(date)
  const month = d.getUTCMonth() + 1
  const day = d.getUTCDate()
  const year = d.getUTCFullYear()
  return month + '/' + day + '/' + year
}

module.exports = formatDate
