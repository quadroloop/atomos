const fse = require("fs-extra");
const logger = require("node-color-log");

const APP_NAME = process.argv[2];

if (!APP_NAME || APP_NAME.trim() === "") {
  logger.color("red").log("[ERROR] => App Name not provided.");
  return false;
}

logger.color("cyan").log("⬢[ATOMOS] > Generating App..");
logger.color("yellow").log(`⬢[APP NAME] > ${APP_NAME}`);

fse.copySync("./", `../${APP_NAME}`, {
  overwrite: true,
  filter: (n) => {
    if (n !== ".git") {
      return true;
    }
  },
});
logger.color("green").log("[Atomos App Build]: Done!");
