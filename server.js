const net = require('net');
//var Enum = require('enum');
const PORT = 7000;
const loginlib = require("./login.js");

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
      
                       
        /*const response = Buffer.from("");
        const responsePacketLength = response.length + 6;
        console.log("Packet Length: " + plength);
        socket.write(Buffer.concat([
          Buffer.from([(type >> 8) & 0xff, type & 0xff]),
          Buffer.from([(responsePacketLength >> 8) & 0xff, responsePacketLength & 0xff]),
          Buffer.from([(action+1 >> 8) & 0xff, action+1 & 0xff]),
          response
        ]));  */

        console.log("VERSION CHECK");
        const response = loginlib.version_check();
        write(response);

      }

      if (type == HEADER.TYPE.LOGIN && action == HEADER.ACTION.CRED_CHECK) {
        const response = loginlib.credential_check();
        
        console.log("CRED CHECK");
        write(response);

      }

      if (type == HEADER.TYPE.LOGIN && action == HEADER.ACTION.SERVER_TIME) {
        const response = loginlib.server_time();
        
        console.log("SERVER TIME");
        write(response)
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
  
server.listen(PORT, () => {
  console.log('Server Started on Port: ' + PORT);
});


