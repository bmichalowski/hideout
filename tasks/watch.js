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
var dirPath = "./maps";
var file = fs.readdirSync(dirPath);

var run = () => {
  console.log(
    `Watcher activated for ${dirPath}. Currently present maps: ${file.join(", ")}`
  );
  console.log("Ctrl+C to stop.");
  fs.watch(dirPath, "utf8", function(event, trigger) {
    reloadFile(trigger);
  });
};

module.exports = run;
