module.exports = function(basePath) {
  try {
    var mapFromArgs = process.argv.slice(2)[0];
    if (!process.argv.slice(2)[0]) {
      console.log("Map not specify, example map will be loaded.");
    }
    console.log('basePath', basePath)
    var mapFile = require(basePath + "/maps/" + (process.argv.slice(2)[0] || "example"));
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      // console.log("Provided map name is invalid - map not found. Provided name: ", process.argv.slice(2)[0], __dirname, __filename);
      // console.log('Error: ', e);
      process.exit();
    } else {
      throw new Error(e);
    }
  }
  return mapFile;
};
