const EventEmitter = require('events');
const messageEmitter = new EventEmitter();

const postWebhook = (req, res) => {
  const { order, client } = req.body;
  console.log(`Received message from user ${client}:`, order);
  // Emit the message with the userId
  messageEmitter.emit('message', { client, order });

  res.status(200).send('Message received');
};

const sse = (req, res) => {
  const userId = req.query.userId;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const messageHandler = (data) => {

      res.write(`data: ${JSON.stringify({ client: data.client , order: data.order })}\n\n`);

  };

  messageEmitter.on('message', messageHandler);

  req.on('close', () => {
    messageEmitter.removeListener('message', messageHandler);
  });
};

module.exports = { postWebhook, sse, messageEmitter };
