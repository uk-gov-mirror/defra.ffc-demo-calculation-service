module.exports = {
  method: 'GET',
  path: '/calculation',
  options: {
    handler: (request, h) => {
      return {
        hello: 'world'
      }
    }
  }
}
