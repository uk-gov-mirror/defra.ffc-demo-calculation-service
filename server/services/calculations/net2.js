const baseDate = new Date(2015, 1, 29)

module.exports = {
  calculate: function (claim) {
    return new Date(claim.dateOfSubsidence) < baseDate ? 11 : 9
  }
}
