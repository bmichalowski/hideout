// Add map preview in console

const reloadFile = fileName => {
  const { exec } = require("child_process");

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
      console.log(`stdout: ${stdout}`);
    }
  );
};

var fs = require("fs");
// var filePath = 'C:\\project\\hideout\\levels';
var filePath = "./levels";
var file = fs.readdirSync(filePath);

var run = () => {
  console.log(
    "Watcher activated for ./levels. Currently present maps: " + file.join(", ")
  );
  console.log("Ctrl+C to stop.");
  fs.watch(filePath, "utf8", function(event, trigger) {
    reloadFile(trigger);
  });
};

module.exports = run;
