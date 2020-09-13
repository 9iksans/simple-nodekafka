const kafka = require('kafka-node');
const bp = require('body-parser');
var buffer = require('buffer');
var path = require('path');
var fs = require('fs');
var i = 1;

const host = process.env.HOST;
const port = process.env.PORT;
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: host+":"+port});
  var topicsToCreate = [{
    topic: 'image-action',
    partitions: 1,
    replicationFactor: 1
  }];

  client.createTopics(topicsToCreate, (error, result) => {

  });

try {

  let consumer = new Consumer(
    client,
    [{ topic: 'image-action', partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );
  
  consumer.on('message', async function(message) {
    console.log(
      'kafka-> ',
      message.value
    );
    //decode_base64(message.value, 'cek.jpg'  );
  })

  function decode_base64(base64str , filename){

    var buf = Buffer.from(base64str,'base64');
  
    fs.writeFile(path.join(__dirname,'/images/',filename), buf, function(error){
      if(error){
        throw error;
      }else{
        console.log('File created from base64 string!');
        return true;
      }
    });
  
  }

  consumer.on('error', function(err) {
    console.log('error', err);
  });

  
}
catch(e) {
  console.log(e);
}
