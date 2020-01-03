var tasks = require("./tasks");

var taskToRun = process.argv.slice(2)[0];

if (taskToRun && tasks[taskToRun]) {
  tasks[taskToRun]();
} else {
  console.log("Add existing task name as a param.");
  console.log("Supported tasks: " + Object.keys(tasks).join(", "));
}
