var tiles = require("./utils/tiles").tiles;

// if (require.main === module) {
//   console.log("called directly");
// } else {
//   console.log("required as a module");
// }

var virtualConsole = {
  lines: [],
  currentLine: 0,
  log: function(msg, appendToCurrentLine) {
    if (!appendToCurrentLine) virtualConsole.currentLine++;

    if (
      appendToCurrentLine &&
      virtualConsole.lines[virtualConsole.currentLine]
    ) {
      virtualConsole.lines[virtualConsole.currentLine] += msg;
    } else {
      virtualConsole.lines[virtualConsole.currentLine] = msg;
    }

    console.clear();

    virtualConsole.lines.forEach(function(line) {
      console.log(line);
    });
  },
  clear: function() {
    console.clear();
    virtualConsole.currentLine = 0;
    virtualConsole.lines = [];
  }
};

var getCalculatedMap = function(map) {
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
  objects.forEach(obj => {
    const { x, y, state } = obj;
    if (obj.name === "door" && map[y][x] !== "D")
      console.error(
        `(${map[y][x]}): Target element is not a door object. Check cords. x: ${obj.x}, y: ${obj.y}.`
      );
    map[y][x] = obj.possibleStates[state].symbol();
  });
  return updatedMap;
};

var draw = function(mapFile) {
  var map = getCalculatedMap(mapFile.map);
  map = calculateObjects(mapFile.objects, map);
  virtualConsole.log(`---(${mapFile.name})---`);
  virtualConsole.log("");
  map.forEach(row => {
    row.forEach(tile => {
      virtualConsole.log(tile, true);
    });
    virtualConsole.log("");
  });
  virtualConsole.log("");
};

var getMapFile = function() {
  try {
    var mapFromArgs = process.argv.slice(2)[0];
    if (!process.argv.slice(2)[0]) {
      console.log("Map not specify, example map will be loaded.");
    }
    var mapFile = require("./levels/" +
      (process.argv.slice(2)[0] || "example"));
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      console.log("Provided map name is invalid - map not found.");
      process.exit(1);
    } else {
      throw new Error(e);
    }
  }
  return mapFile;
};

draw(getMapFile());
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

// check if flag is present
if (process.argv.slice(2).indexOf("skipWaitForInput") > -1) {
  return;
}
waitForInput();
