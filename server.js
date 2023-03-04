const net = require('net');
var mysql = require('mysql');

//var Enum = require('enum');
const PORT = 7000;
const loginlib = require("./login.js");
const inventorylib = require("./inventory.js")

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
  
    console.log('Connected to the MySQL server.');
  });

//var HEADERTYPE = new Enum({'LOGIN': 0x10, 'QUERY': 0x40, 'GENERAL': 0x30, "INVENTORY": 0x31, "GAMEGUARD": 0x48}, )
var HEADER = { 
    TYPE: {
        LOGIN: 0x10,
        GENERAL: 0x30,
        INVENTORY: 0x31,
        GAMEGUARD: 0x48,
        QUERY: 0x40
    },
    ACTION: {
        // LOGIN (0x10)
        VERSION_CHECK: 0x90,
        SERVER_TIME: 0x92,
        CRED_CHECK: 0x84,
        ACCOUNT_CREATION: 0x88,
        CASH_UNKNOWN: 0xd0,
        BUDDY_LIST: 0xa8,
        TO_LOBBY: 0xb6,

        // GAMEGUARD (0x48)
        GAMEGUARD_START: 0x80,

        // GENERAL (0x30)
        GET_PROPERTY: 0x84,
        GIFT_FROM: 0x92,
        GIFT_TO: 0x90,
        UNKNOWN_1: 0x86,
        UNKNOWN_2: 0xb4,
        UNKNOWN_3: 0xb2,
        UNKNOWN_4: 0xba,
        AVATAR_LIST: 0x88,
        GET_GRADE: 0xa0,
        TO_INFO: 0xbc,
        UNKNOWN_5: 0xcc,
        BUYING: 0xce,
        TO_TRAINING: 0x80,
        EQUIP_ITEM: 0xd6,
        JOIN_ROOM_BS: 0xa0,

        // INVENTORY (0x31)
        OLD_RF: 0x8c,
        CASH: 0x88,
        UNKNOWN_6: 0x8a,
        BUY_ITEM: 0x80,
        
        // QUERY (0x40)
        UNKNOWN_7: 0xa0,
        UNKNOWN_8: 0xa6,
        UNKNOWN_9: 0xa4,
        GET_ROOM: 0x84,
        CREATE_ROOM: 0x86,
        JOIN_ROOM_1: 0x80,
        JOIN_ROOM_2: 0x88,
        USER_READY: 0x60,
        LEAVE_ROOM: 0x82,
        CHANGE_MAP: 0xa8,
        START_GAME: 0x61,
        EQUIPPING: 0xa4,
        
    }
}


const server = net.createServer((socket) => {
  console.log('[Client Connected]');


  socket.on('data', (data) => {
    const type = data.readUInt16BE(0);
    const plength = data.readUInt16BE(2);
    const action = data.readUInt16LE(4);
    const body = data.slice(6, plength);

    // handle the packet based on the header information

    console.log("Packet Action: " + action);

    if (type == HEADER.TYPE.LOGIN && action == HEADER.ACTION.VERSION_CHECK ) {
                       

      bconsole.log("VERSION CHECK");
      const response = loginlib.version_check();
      write(response);

    }

    if (type == HEADER.TYPE.LOGIN && action == HEADER.ACTION.CRED_CHECK) {
        //const response = loginlib.credential_check();

      console.log("Credential Check");

      var email_array = [];
      var password_array = [];

      for (var i = 0, k = 0; body[i] != 0;  i++, k++)
      {
        email_array[k] = body[i] 
      }

      for (var i = 64, k = 0; body[i] != 0;  i++, k++)
      {
        password_array[k] = body[i] 
      }
        
      email = String.fromCharCode.apply(null, email_array);
      password = String.fromCharCode.apply(null, password_array);

      console.log(email, password);

      const response = Buffer.alloc(320, 0);
      const type = 0x10;
      const plength = response.length + 6;
      const action = HEADER.ACTION.CRED_CHECK;
    
      connection.query("SELECT * FROM accounts WHERE email=? AND password=?", [email, password], function (err, result, fields) {
        if (err) throw err;
          if (result.length > 0)
          {
            if (result[0].has_character == 1)
            {
              console.log(result[0].email);
              console.log("Login Successful");
              uuid = result[0].uuid;
              carats = result[0].carats;
              astros = result[0].astros;
              userign = result[0].ign;
              GUID = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
              token = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234";
              forum_name = result[0].forum_name;
    
              response.writeUint32LE(uuid, 0);
              response.write(userign, 4);
              response.writeUint32LE(carats, 32);
              response.write(GUID, 90);
              response.write(token, 191);
              response.write(forum_name, 256);
              
              //byteUsername = ascii_to_hex(userign);
              
              var buffer = Buffer.concat([
                Buffer.from([(type >> 8) & 0xff, type & 0xff]),
                Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
                Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
                response


            ])

            write(buffer);
    
          } else {
            console.log("Login Successful, No Character")

            const response = Buffer.alloc(520, 0);
            const type = 528;
            const action = HEADER.ACTION.CRED_CHECK;


            
            var buffer = Buffer.concat([
              Buffer.from([(type >> 8) & 0xff, type & 0xff]),
              Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
              Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
              response

            ])


          }  
 
          } else {
            console.log("User doesn't exist");

            const response = Buffer.alloc(514, 0);
            const type = 528;
            const plength = response.length + 6;
            const action = 0xbe0285 - 1;
            //const temp = 0x02be;

            response.write("¾Please check your Email or Password and try again.")

            var buffer = Buffer.concat([
              Buffer.from([(type >> 8) & 0xff, type & 0xff]),
              Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
              Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
              //Buffer.from([(temp >> 8) &0xff, temp & 0xff]),
              response

            ])

            write(buffer);

          }
                      
          //const response = loginlib.credential_check(email, password);
         
    
          })
    
      }


    if (type == HEADER.TYPE.LOGIN && action == HEADER.ACTION.SERVER_TIME) {
      const response = loginlib.server_time();
        
      console.log("SERVER TIME");
      write(response)
    }

    if (type == HEADER.TYPE.GENERAL && action == HEADER.ACTION.BUYING) {
      const response = inventorylib.buy();
      
      console.log("BUYING");
      write(response);
    }

    if (type == HEADER.TYPE.GENERAL && action == HEADER.ACTION.EQUIP_ITEM) {
      const response = inventorylib.equip();
      
      console.log("Equip");
      write(response);

    }

    if (type == HEADER.TYPE.INVENTORY && action == HEADER.ACTION.CASH) {
      const response = inventorylib.cash(uuid);

      console.log("Cash");
      write(response);
    }

    if (type == HEADER.TYPE.INVENTORY && action == HEADER.ACTION.BUY_ITEM) {
      const response = inventorylib.buy_item();

      console.log("Buying Item");
      write(response);
    }
    
  });

  socket.on('error', err => {
    console.log('[Client Encountered an Error]');
});

socket.on('close', () => {
    console.log("[Client Disconnected]");
});

function write(response) { 
socket.write(Buffer.concat([
  response
]))

}

});

function ascii_to_hex(str)
  {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
   }

   function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        {

            bytes.push(parseInt(hex.substr(c, 2), 16));
        }
            return bytes;
}


  
server.listen(PORT, () => {
  console.log('Server Started on Port: ' + PORT);
});




