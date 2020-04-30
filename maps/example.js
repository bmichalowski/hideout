module.exports = {
  name: "example",
  map: [
    [2, 2, 2, 1, 2, 2, 2, 2, 2],
    [2, 4, 4, 4, 4, 4, 4, 4, 2],
    [2, 4, 4, 2, 4, 2, 2, 1, 2],
    [2, 4, 2, 2, 4, 3, 2, 5, 2],
    [6, 4, 3, 3, 3, 4, 6, 5, 2],
    [2, 6, 2, 1, 2, 2, 2, 6, 2]
  ],
  init: function() {
    this.objects.push(
      new Door(0, 4, "open"),
      new Door(1, 5, "close"),
      new Door(7, 5, "close"),
      new Door(6, 4, "close"),
      new Chest(2, 2, "close", [
        {
          name: "letter",
          look: function() {
            return "A letter.";
          }
        }
      ]),
      new Table(5, 3, [])
    );
    return this;
  },
  objects: []
};

var Door = function(x, y, initialState) {
  return {
    name: "door",
    x,
    y,
    state: initialState,
    possibleStates: {
      open: {
        name: "open",
        symbol: () => "/",
        crossable: () => true
      },
      close: {
        name: "close",
        symbol: () => "\\",
        crossable: () => false
      }
    },
    use: function() {
      if (this.state === "open") {
        this.state = "close";
      } else {
        this.state = "open";
      }
    }
  };
};

var Chest = function(x, y, initialState, items) {
  return {
    name: "chest",
    container: () => true,
    hasSecret: true,
    items,
    x,
    y,
    state: initialState,
    possibleStates: {
      open: {
        name: "open",
        symbol: () => "▀",
        crossable: () => false
      },
      close: {
        name: "close",
        symbol: () => "▄",
        crossable: () => false
      }
    },
    use: function() {
      if (this.state === "open") {
        this.state = "close";
      } else {
        this.state = "open";
      }
      return `Door are now ${this.state}.`;
    },
    look: function() {
      if (this.hasSecret) {
        this.items.push({
          name: "Rusty key",
          look: () => "It's an old rusty key."
        });
        this.hasSecret = false;
        return "You have found a hole with key inside of it.";
      }
      return "Solid wooden chest.";
    }
  };
};

var Table = function(x, y, items) {
  return {
    name: "table",
    container: () => true,
    items,
    x,
    y,
    state: "open",
    possibleStates: {
      open: {
        name: "open",
        crossable: () => false,
        symbol: () => "π"
      }
    },
    use: function() {
      return `Table is now ${this.state}.`;
    },
    look: function() {
      return "Solid wooden table.";
    }
  };
};

/**
 Items:
 allways crossable, with one unchangable state
 */

var coins = function(x, y, amount) {
  return {
    name: "coins",
    use: function() {
      return `Table is now ${this.state}.`;
    },
    look: function() {
      return "Pile of coins.";
    }
  };
};
