var actions = ["use", "look", "take", "drop", "walk"];

var item = {
  name: 'item',
  value: 20,
  use: () => {
    // ...
    return '';
  },
  look: () => {
    // ...
    return '';
  }
};

var getDoorOrientation = function(map, x, y) {
  if (map[y - 1][x].name === "wall" && map[y + 1][x].name === "wall") {
    return "WE";
  }
  return "NS";
};

var doorSymbol = {
  WE: {
    // 1010
    open: "_",
    close: "|",
    partiallyOpen: "/"
  },
  NS: {
    // 0101
    open: "|",
    close: "_",
    partiallyOpen: "/"
  }
};

var tile = {
  name: "Door WE",
  states: {
    open: {
      symbol: "_",
      crossable: true,
      actions: [{ name: "", effect: "" }, {}]
    },
    close: {
      symbol: "|",
      crossable: false
    }
  }
};

// up right down left as a string with concated booleans
var wallSymbol = {
  "0000": "#",
  "0001": "═",
  "0010": "║",
  "0011": "╗",
  "0100": "═",
  "0101": "═",
  "0110": "╔",
  "0111": "╦",
  "1000": "║",
  "1001": "╝",
  "1010": "║",
  "1011": "╣",
  "1100": "╚",
  "1101": "╩",
  "1110": "╠",
  "1111": "╬"
};

var windowSymbol = {
  "0000": "+",
  "0001": "─",
  "0010": "│",
  "0011": "┐",
  "0100": "─",
  "0101": "─",
  "0110": "┌",
  "0111": "┬",
  "1000": "│",
  "1001": "┘",
  "1010": "│",
  "1011": "┤",
  "1100": "└",
  "1101": "┴",
  "1110": "├",
  "1111": "┼"
};

var floor = {
  carpet: "░",
  wood: "▒",
  stone: "▓"
};

var checkSurroundings = (map, x, y) =>
  [
    y !== 0 && [1, 2, 6].indexOf(map[y - 1][x]) > -1 ? 1 : 0,
    x !== map[0].length - 1 && [1, 2, 6].indexOf(map[y][x + 1]) > -1 ? 1 : 0,
    y !== map.length - 1 && [1, 2, 6].indexOf(map[y + 1][x]) > -1 ? 1 : 0,
    x !== 0 && [1, 2, 6].indexOf(map[y][x - 1]) > -1 ? 1 : 0
  ].join("");

var getWallSymbol = function(map, x, y, material) {
  var surroundings = checkSurroundings(map, x, y);
  if (material === 1) {
    return windowSymbol[surroundings];
  }
  return wallSymbol[surroundings];
};

var tiles = {
  0: () => " ",
  1: (map, x, y) => getWallSymbol(map, x, y, 1),
  2: (map, x, y) => getWallSymbol(map, x, y, 2),
  3: () => floor.stone,
  4: () => floor.wood,
  5: () => floor.carpet,
  6: () => "D" // door
};

module.exports = tiles;

/**
 * 
 Wall
    stone
    wood
    one block - w(OOD) /s(TONE) pillar
Door
    wood
    iron ??
Floor
    dirt XXX
    wooden planks
    stone

Container
    chest
    barrel
    desk



 */
