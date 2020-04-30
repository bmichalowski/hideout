// Add map preview in console
const debounce = require("../utils/debounce");
const { exec } = require("child_process");

const reloadFile = fileName => {
  exec(
    `node index.js ${fileName} skipWaitForInput`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      if (stdout) {
        console.log(`stdout: ${stdout}`);
        return;
      }
      console.log(`Watcher: Unable to open ${fileName}. Deleted?`);
    }
  );
};

var fs = require("fs");
var dirPath = "./maps";
var file = fs.readdirSync(dirPath);

var run = () => {
  console.log(
    `Watcher activated for ${dirPath}. Currently present maps: ${file.join(
      ", "
    )}`
  );
  console.log("Ctrl+C to stop.");
  fs.watch(
    dirPath,
    "utf8",
    debounce(function(event, trigger) {
      reloadFile(trigger);
    }, 200)
  );
};

module.exports = run;
