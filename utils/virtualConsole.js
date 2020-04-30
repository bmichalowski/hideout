module.exports = {
  lines: [],
  currentLine: 0,
  log: function(msg, appendToCurrentLine) {
    if (!appendToCurrentLine) this.currentLine++;

    if (appendToCurrentLine && this.lines[this.currentLine]) {
      this.lines[this.currentLine] += msg;
    } else {
      this.lines[this.currentLine] = msg;
    }
  },
  show: function() {
    this.clear();
    this.lines.forEach(function(line) {
      console.log(line.join(""));
    });
  },
  get: function() {
    return this.lines;
  },
  clear: function() {
    console.clear();
    this.currentLine = 0;
    this.lines = [];
  }
};
