const { Kafka } = require('kafkajs');

// The message to send.
const message = process.argv[2] ||  'Hello KafkaJS user!';

// The topic to use when sending a message.
const topic = process.argv[3] || 'test-topic';

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:29092']
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

sendMessage();