const baseValue = 100

module.exports = {
  calculate: function (claim) {
    switch (claim.propertyType) {
      case 'business': return baseValue * 2
      default: return baseValue
    }
  }
}
