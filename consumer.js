const { Kafka } = require('kafkajs');

// The topic to use when sending a message.
const topic = process.argv[2] || 'test-topic';

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:29092']
});

const getMessage = async function () {
    const consumer = kafka.consumer({ groupId: 'test-group' });

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