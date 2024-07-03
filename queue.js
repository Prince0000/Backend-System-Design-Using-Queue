const amqp = require('amqplib');

const QUEUE = 'requests';
let connection = null;
let channel = null;

const rabbitMQUrl = 'amqp://guest:guest@localhost';

const connectToQueue = async () => {
  try {
    connection = await amqp.connect(rabbitMQUrl);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    console.log('Connected to RabbitMQ and queue is ready');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    throw error;
  }
};

const addToQueue = async (userId, request) => {
  try {
    if (!channel) {
      await connectToQueue();
    }
    const msg = JSON.stringify({ userId, request });
    channel.sendToQueue(QUEUE, Buffer.from(msg), { persistent: true });
    console.log('Message sent to queue',msg);
  } catch (error) {
    console.error('Error adding to queue:', error.message);
    throw error;
  }
};

const processQueue = async (workerFunction) => {
  try {
    if (!channel) {
      await connectToQueue();
    }
    channel.consume(QUEUE, async (msg) => {
      try {
        if (msg !== null) {
          const content = JSON.parse(msg.content.toString());
          await workerFunction(content.userId, content.request);
          channel.ack(msg);
        }
      } catch (error) {
        console.error('Error processing message:', error.message);
        channel.nack(msg);
      }
    }, { noAck: false });
  } catch (error) {
    console.error('Error consuming queue:', error.message);
    throw error;
  }
};

const closeConnection = async () => {
  try {
    if (channel) {
      await channel.close();
    }
    if (connection) {
      await connection.close();
    }
    console.log('Closed RabbitMQ connection');
  } catch (error) {
    console.error('Error closing RabbitMQ connection:', error.message);
    throw error;
  }
};

// Exporting addToQueue, processQueue, and closeConnection functions
module.exports = { addToQueue, processQueue, closeConnection };
