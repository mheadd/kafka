const { Kafka } = require('kafkajs');
const config = require('./config.json');

// The message to send.
const message = process.argv[2] || config.defaultMessage;

// The topic to use when sending a message.
const topic = process.argv[3] || config.defaultTopic;

// Create a new KafkaJS instance.
const kafka = new Kafka({
	clientId: config.clientId,
	brokers: [`${config.brokerIP}:${config.brokerPort}`]
});

// Producer
const sendMessage = async function () {
	const producer = kafka.producer();
	await producer.connect();
	await producer.send({
		topic: topic,
		messages: [
			{ value: message },
		],
	})
	await producer.disconnect();
}

// Send the message.
sendMessage();