const net = require('net');
const PORT = 7000;
const client = net.createConnection({ port: PORT }, () => {
  console.log('connected to server');
  
  const request = Buffer.alloc(6, 0);

  request.writeUInt16BE(0x10, 0); 
  request.writeUInt16BE(0x06,  2);
  request.writeUInt16LE(0x90, 4);

  client.write(request);
});

client.on('data', (data) => {
  const type = data.readUInt16BE(0);
  const packetLength = data.readUInt16BE(2);
  const action = data.readUint16LE(4);

  const response = data.slice(6, packetLength).toString();
  console.log(response);

  if (action == 0x91)
  {
    const request = Buffer.alloc(6, 0);
    
    request.writeUInt16BE(0x10, 0); 
    request.writeUInt16BE(0x06,  2);
    request.writeUInt16LE(0x92, 4);

    client.write(request);

  }
  
});

client.on('end', () => {
  console.log('disconnected from server');
});
