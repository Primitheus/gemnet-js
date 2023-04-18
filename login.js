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
    password: '***REMOVED***',
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

async function credential_check(email, password) {

  const response = Buffer.alloc(320, 0);
  const type = 0x10;
  const plength = response.length + 6;
  const action = 0x84;
    
      return new Promise((resolve, reject) => {connection.query("SELECT * FROM accounts WHERE email=? AND password=?", [email, password], function (err, result, fields) {
        if (err) reject(err);
          if (result.length > 0)
          {
            if (result[0].has_character == 1)
            {
              console.log(result[0].email);
              console.log("Login Successful");
              uuid = result[0].uuid;
              exp = result[0].exp;
              carats = result[0].carats;
              astros = result[0].astros;
              userign = result[0].username;
              GUID = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
              token = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234";
              forum_name = result[0].forum_name;
    
              response.writeUint32LE(uuid, 0);
              response.write(userign, 4);
              response.writeUint32LE(exp, 28); // Exp
              response.writeUint32LE(carats, 32);
              response.write(GUID, 90);
              response.write(token, 191);
              response.write(forum_name, 256);
              
              //byteUsername = ascii_to_hex(userign);
              
              resolve(
                Buffer.concat([
                  Buffer.from([(type >> 8) & 0xff, type & 0xff]),
                  Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
                  Buffer.from([(action + 1) & 0xff, (action + 1) >> 8]),
                  response,
                ])
              );
    
          } else {
            console.log("Login Successful, No Character")

            const response = Buffer.alloc(520, 0);
            const type = 528;
            const action = HEADER.ACTION.CRED_CHECK;

            resolve(
              Buffer.concat([
                Buffer.from([(type >> 8) & 0xff, type & 0xff]),
                Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
                Buffer.from([(action + 1) & 0xff, (action + 1) >> 8]),
                response,
              ])
            );

          }  
 
          } else {
            console.log("User doesn't exist");

            const response = Buffer.alloc(514, 0);
            const type = 528;
            const plength = response.length + 6;
            const action = 0xbe0285 - 1;
            //const temp = 0x02be;

            response.write("¾Please check your Email or Password and try again.")

            resolve(
              Buffer.concat([
                Buffer.from([(type >> 8) & 0xff, type & 0xff]),
                Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
                Buffer.from([(action + 1) & 0xff, (action + 1) >> 8]),
                response,
              ])
            );
          }           
          })
        });
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