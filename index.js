var tiles = require("./utils/tiles");
var virtualConsole = require("./utils/virtualConsole");
var mapValidation = require("./utils/mapValidation");
var getMapFile = require("./utils/getMapFile");

// if (require.main === module) {
//   console.log("called directly");
// } else {
//   console.log("required as a module");
// }

var mapFile = getMapFile(process.cwd());
console.log(`mapFile: ${mapFile}`);


var calculateFloor = function(map) {
  var rawMap = [];
  let currentRow = 0;
  map.forEach((row, rowIdx) => {
    rawMap[currentRow] = [];
    row.forEach((tile, colIdx) => {
      rawMap[currentRow].push(tiles[tile](map, colIdx, rowIdx));
    });
    currentRow++;
  });
  return rawMap;
};

var calculateObjects = function(objects, map) {
  var updatedMap = map;
  objects.forEach(({ x, y, state, possibleStates, name }) => {
    try{
      map[y][x] = possibleStates[state].symbol();
    } catch(e) {console.log('calculateObjects: ', { x, y, state, possibleStates, name }, e)}
    
  });
  return updatedMap;
};

var draw = function(mapFile) {
  var initializedMap = mapFile.init();
  var map = calculateFloor(initializedMap.map);
  map = calculateObjects(initializedMap.objects, map);
  virtualConsole.log(`---(${initializedMap.name})---`);
  virtualConsole.log("");
  map.forEach(row => {
    row.forEach(tile => {
      virtualConsole.log(tile, true);
    });
    virtualConsole.log("");
  });
  virtualConsole.log("");

  mapValidation(map);
};

const waitForInput = () => {
  var stdin = process.stdin;
  console.log(typeof stdin, typeof stdin.setRawMode);
  stdin.setRawMode(true);

  // resume stdin in the parent process (node app won't quit all by itself
  // unless an error or process.exit() happens)
  stdin.resume();

  // i don't want binary, do you?
  stdin.setEncoding("utf8");

  // on any data into stdin
  stdin.on("data", function(key) {
    // ctrl-c ( end of text )
    if (key === "\u0003") {
      process.exit();
    }
    // write the key to stdout all normal like
    process.stdout.write(`--(${key})--`);
    // process.exit();
  });
};

draw(mapFile);

// check if flag is present
if (process.argv.slice(2).indexOf("skipWaitForInput") > -1) {
  return;
}

waitForInput();
