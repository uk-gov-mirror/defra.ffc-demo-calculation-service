const _ = require('lodash')

module.exports = {
  calculate: function (claim) {
    const baseValue = calculateBase(claim.propertyType)
    const multiplier = calculateMultiplier(claim.accessible)
    return _.multiply(baseValue, multiplier)
  }
}

function calculateBase (propertyType) {
  return propertyType === 'business' ? 0.45 : 0.43
}

function calculateMultiplier (accessible) {
  return accessible ? 0.2 : 0.1
}
