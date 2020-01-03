module.exports = {
  name: "example",
  map: [
    [2, 2, 2, 1, 2, 2, 2, 2, 2],
    [2, 4, 4, 4, 4, 4, 4, 4, 2],
    [2, 4, 4, 2, 4, 4, 2, 1, 2],
    [2, 3, 2, 2, 4, 4, 2, 5, 2],
    [6, 4, 4, 4, 4, 4, 5, 5, 2],
    [2, 6, 2, 1, 2, 2, 1, 6, 2]
  ],
  objects: [
    {
      name: "door",
      type: "static",
      x: 0,
      y: 4,
      state: "open",
      possibleStates: {
        open: {
          name: "open",
          symbol: () => "/"
        },
        close: {
          name: "close",
          symbol: () => "\\"
        }
      },
      use: function() {
        if (this.state === "open") {
          this.state = "close";
        } else {
          this.state = "open";
        }
        return `Door are now ${this.state}.`;
      }
    },
    {
      name: "door",
      type: "static",
      x: 1,
      y: 5,
      state: "close",
      possibleStates: {
        open: {
          name: "open",
          symbol: () => "/"
        },
        close: {
          name: "close",
          symbol: () => "\\"
        }
      },
      use: function() {
        if (this.state === "open") {
          this.state = "close";
        } else {
          this.state = "open";
        }
        return `Door are now ${this.state}.`;
      }
    },
    {
      name: "door",
      type: "static",
      x: 7,
      y: 5,
      state: "close",
      possibleStates: {
        open: {
          name: "open",
          symbol: () => "|"
        },
        close: {
          name: "close",
          symbol: () => "-"
        }
      },
      use: function() {
        if (this.state === "open") {
          this.state = "close";
        } else {
          this.state = "open";
        }
        return `Door are now ${this.state}.`;
      }
    },
    {
      name: "chest",
      type: "static",
      container: () => true,
      items: [{ name: "letter", use: () => "Hello World!" }],
      x: 2,
      y: 2,
      state: "close",
      possibleStates: {
        open: {
          name: "open",
          symbol: () => "▀"
        },
        close: {
          name: "close",
          symbol: () => "▄"
        }
      },
      use: function() {
        if (this.state === "open") {
          this.state = "close";
        } else {
          this.state = "open";
        }
        return `Door are now ${this.state}.`;
      }
    }
  ]
};

var door = {
  x: 2,
  y: 2,
  name: "door",
  state: {
    crossable: false,
    symbol: "|"
  },
  states: {
    close: {
      crossable: false,
      symbol: "|"
    },
    open: {
      crossable: true,
      symbol: "_"
    },
    partiallyOpen: {
      crossable: true,
      symbol: "/"
    }
  },
  actions: ["open", "close", "knock", "partially open"],
  set changeTo(state) {
    if (state === "open") {
      this.state = this.states["open"];
    } else {
      this.state = this.states["close"];
    }
  }
};
