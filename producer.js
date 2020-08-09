const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config.js');




try {
const Producer = kafka.Producer;
const client = new kafka.KafkaClient('localhost:2181');
const producer = new Producer(client);
const kafka_topic = 'image-action';
console.log(kafka_topic);
 var i  = 1
  let payloads = [
    {
      topic: kafka_topic,
      messages: 'chek something' + i++
    }
  ];

  producer.on('ready', async function() {
    for( var k = 0; k < 5; k++){
    producer.send(payloads, (err, data) => {
      if (err) {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
      } else {
        console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
      }
    });
    }   
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}
