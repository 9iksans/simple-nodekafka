const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');
var buffer = require('buffer');
var path = require('path');
var fs = require('fs');
var i = 1;
try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient('localhost:2181');

  
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
    decode_base64(message.value, 'cek'+ i++ +'.jpg'  );
  })

  function decode_base64(base64str , filename){

    var buf = Buffer.from(base64str,'base64');
  
    fs.writeFile(path.join(__dirname,filename), buf, function(error){
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
