var mysql = require('mysql');
const { resolve } = require('path');

var carats;
var astros;
var uuid;
var userign;
var GUID;
var token;
var forum_name;


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'rumblefighter'
  });
  

  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    //console.log('Connected to the MySQL server.');
  });

function version_check() {

    const response = Buffer.alloc(6, 0);

    response.writeUInt16BE(0x10, 0);
    response.writeUInt16BE(0x06,  2);
    response.writeUInt16LE(0x91, 4);
    
    return response
}

function credential_check(email, password) {

}

function server_time() {

    const nodejsTimestamp = Date.now();
    const windows64Timestamp = (nodejsTimestamp + 11644473600000) * 10000;
    //const response = Buffer.alloc(14, 0)

    var timestamphex = windows64Timestamp.toString(16).padStart(16, '0');
 
    var byteArray = hexToBytes(timestamphex);
    const response = Buffer.from(byteArray);

    const type = 0x10;
    const plength = response.length + 6;
    const action = 0x92;

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])
}

function hexToBytes(hex) {
    for (var bytes = [], c = hex.length-2; c > -2; c -= 2)
        {

            bytes.push(parseInt(hex.substr(c, 2), 16));
        }
            return bytes;
}

module.exports = { version_check, credential_check, server_time };