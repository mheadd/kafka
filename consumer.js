const { Kafka } = require('kafkajs');
const config = require('./config.json');

// The topic to use when sending a message.
const topic = process.argv[3] || config.defaultTopic;

// Create a new KafkaJS instance.
const kafka = new Kafka({
  clientId: config.clientId,
  brokers: [`${config.brokerIP}:${config.brokerPort}`]
});

const getMessage = async function () {
  const consumer = kafka.consumer({ groupId: config.groupId });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  });
}

getMessage();