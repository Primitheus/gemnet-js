function version_check() {

    const response = Buffer.alloc(6, 0);

    response.writeUInt16BE(0x10, 0);
    response.writeUInt16BE(0x06,  2);
    response.writeUInt16LE(0x91, 4);
    
    return response
}

function credential_check() {

    const response = Buffer.alloc(6, 0);

    response.writeUInt16BE(0x10, 0);
    response.writeUInt16BE(0x06,  2);
    response.writeUInt16LE(0xff, 4);
    
    return response
}

function server_time() {

    const response = Buffer.from([0xE0, 0x8D, 0xA6, 0xE6, 0xAB, 0x01, 0xD8, 0x01]); // this should theoretically be calculated to return the correct server time

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

module.exports = { version_check, credential_check, server_time };