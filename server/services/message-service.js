const amqp = require('amqplib/callback_api')

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
          console.log(' [x] Received %s', msg.content.toString())
        }, { noAck: true })
      })
    })
  }
}
