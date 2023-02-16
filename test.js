const hexValues = {
    'A': 1010,
    'B': 1011,
    'C': 1100,
    'D': 1101,
    'E': 1110,
    'F': 1111,
    '1': 0001,
    '2': 0010,
    '3': 0011,
    '4': 0100,
    '5': 0101,
    '6': 0110,
    '7': 0111,
    '8': 1000,
    '9': 1001,
    '0': 0000,
  };

  function hex2bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}
  var result = ""
"F0 05 61 DF AC 01 D8 01".split(" ").forEach(str => {
  result += hex2bin(str)
})
console.log(result)
var test  = "111100000000010101100001110111111010110000000001110110000001"
console.log(parseInt(result, 2));