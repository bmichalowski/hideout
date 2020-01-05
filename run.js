const tasks = require("./tasks");

const taskToRun = process.argv.slice(2)[0];

if (taskToRun && tasks[taskToRun]) {
  tasks[taskToRun]();
} else {
  console.log("Add existing task name as a param. e.g. 'node run watch'");
  console.log("Supported tasks: " + Object.keys(tasks).join(", "));
}