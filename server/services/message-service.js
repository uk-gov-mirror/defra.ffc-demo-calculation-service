const amqp = require('amqplib/callback_api')
const calculationService = require('./calculation-service')

module.exports = {
  receiveClaim: function () {
    amqp.connect('amqp://localhost', function (err, conn) {
      if (err) {
        console.log(err)
      }
      conn.createChannel(function (err, ch) {
        if (err) {
          console.log(err)
        }

        const calculationQueue = 'calculation'
        ch.assertQueue(calculationQueue, { durable: false })
        console.log('waiting for messages')
        ch.consume(calculationQueue, function (msg) {
          console.log(`claim received for calculation - ${msg.content.toString()}`)
          const claim = JSON.parse(msg.content)
          const value = calculationService.calculate(claim)
          publishCalculation({ claimId: claim.claimId, value: value })
        }, { noAck: true })
      })
    })
  }
}

function publishCalculation (calculation) {
  amqp.connect('amqp://localhost', function (err, conn) {
    if (err) {
      console.log(err)
    }
    conn.createChannel(function (err, ch) {
      if (err) {
        console.log(err)
      }

      const data = JSON.stringify(calculation)

      const valueQueue = 'value'
      ch.assertQueue(valueQueue, { durable: false })
      ch.sendToQueue(valueQueue, Buffer.from(data))
      console.log('calculation queued for payment')
    })
  })
}
