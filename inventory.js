var mysql = require('mysql');

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
  
  });

function property(uuid) {

    const type = 0x30
    const plength = response.length + 6
    const action = 0x84

    connection.query("SELECT * FROM inventory WHERE uuid= ?", [uuid], function (err, result) {
    if (err) throw err;
    

    })

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

}

function buy() {

    const response = Buffer.from([0xbc, 0x3d, 0x21, 0x04, 0x6a, 0x00, 0xd6, 0x01, 0x04, 0x00, 0x00, 0x00]);

    const type = 0x30;
    const plength = response.length + 6;
    const action = 0xce;


    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

}

function equip() {

    const response = Buffer.from([0x01]);

    const type = 0x30;
    const plength = response.length + 6;
    const action = 0xd6;

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

}

function cash(uuid) {

    const response = Buffer.alloc(12, 0);

    const type = 0x31;
    const plength = response.length + 6;
    const action = 0x88;

    connection.query("SELECT astros FROM accounts WHERE uuid= ?", [uuid], function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            astros = result[0].astros;
            response.writeUint32LE(uuid, 0);
            response.writeUint32LE(astros, 4);
        
        }
    })

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

}

async function get_property(uuid) {
    const response = Buffer.alloc(1434, 0);
  
    const type = 0x30;
    const plength = response.length + 6 + 2488;
    const action = 0x84;
  
    console.log("Getting Property From UUID: ", uuid);
  
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM inventory WHERE uuid= ?", [uuid], function (err, result, fields) {
        if (err) reject(err);
        if (result.length > 0) {
            
          console.log(result);
          console.log(result.length);
          response.writeUint8(5, 0);

          var x = 2;
          var y = 6;

          response.writeUInt32LE(result[0].ServerID, x)
          response.writeUInt32LE(result[0].ItemID, y)


          for (let i = 1 ; i < result.length; i++)
          {
            console.log("i: ", i);
            x += 49;
            y = x + 4;
            response.writeUInt32LE(result[i].ServerID, x);
            response.writeUInt32LE(result[i].ItemID, y);
            console.log("Pos", x, y);
          }
          /*
          response.writeUint32LE(result[0].ServerID, 2);
          response.writeUint32LE(result[0].ItemID, 6);
          response.writeUint32LE(result[1].ServerID, 51);
          response.writeUInt32LE(result[1].ItemID, 55);
          response.writeUint32LE(result[2].ServerID, 100);
          response.writeUint32LE(result[2].ItemID, 104);
          response.writeUint32LE(result[3].ServerID, 149);
          response.writeUint32LE(result[3].ItemID, 153);
          */
        }
        resolve(
          Buffer.concat([
            Buffer.from([(type >> 8) & 0xff, type & 0xff]),
            Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
            Buffer.from([(action + 1) & 0xff, (action + 1) >> 8]),
            response,
          ])
        );
      });
    });
  }


function get_buddy_list() {

    const response = Buffer.alloc(2, 0)

    const type = 0x10;
    const plength = response.length + 6;
    const action = 0xa8;

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

}

function gift_from() {

    const response = Buffer.alloc(2, 0)

    const type = 0x30;
    const plength = response.length + 6;
    const action = 0x92;

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])


}

function gift_to() {

    const response = Buffer.alloc(2, 0)

    const type = 0x30;
    const plength = response.length + 6;
    const action = 0x90;

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

    
}

function avatar_list() {

    const response = Buffer.alloc(2, 0)

    const type = 0x30;
    const plength = response.length + 6;
    const action = 0x88;

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])


}

function get_grade() {

    const response = Buffer.alloc(2, 0)

    const type = 0x30;
    const plength = response.length + 6;
    const action = 0xa0;

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

}


function buy_item(itemid, uuid) {

    const response = Buffer.from([0xFF, 0xFF, 0xb7, 0x07, 0xFF, 0x0FF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x4e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);


    const type = 0x31;
    const plength = response.length + 6;
    const action = 0x80;


    connection.query("SELECT carats FROM accounts WHERE uuid= ?", [uuid], function (err, result, fields) {
        if(err) throw err;
        if (result.length > 0)
        {
            console.log(result[0]);
            new_carats = result[0].carats - 1;
            console.log(new_carats);
        }

        connection.query("INSERT INTO inventory (itemid, UUID) VALUES ('?', '?')", [itemid, uuid], function (err, result) {
            if (err) throw err;
            console.log("User: ", uuid, " has bought item: ", itemid);

        });

        connection.query("UPDATE accounts SET carats = ? WHERE uuid = '?'", [new_carats, uuid], function (err, result) {

        if(err) throw err;

        connection.query("SELECT MAX(ServerID) FROM inventory", function (err, result) {
            if(err) throw err;
            serverid = result[0].ServerID;

        });

        if (result.length > 0)
        {
            response.writeUInt32LE(serverid, 0);
            response.writeUInt32LE(new_carats, 4);
        }
            
        });
    });

    return Buffer.concat([
        Buffer.from([(type >> 8) & 0xff, type & 0xff]),
        Buffer.from([(plength >> 8) & 0xff, plength & 0xff]),
        Buffer.from([(action+1) & 0xff, (action+1) >> 8]),
        response
    ])

}

  module.exports = { buy, equip, cash, buy_item, get_property, gift_from, gift_to, get_grade, avatar_list, get_buddy_list }; 