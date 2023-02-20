const fse = require("fs-extra");

const BUILD_DIR = "./build";
const SERVER_PUBLIC_DIR = "../app-build";

console.log("Building Atomos frontend...");

fse.removeSync(`${SERVER_PUBLIC_DIR}`);
fse.copySync(BUILD_DIR, SERVER_PUBLIC_DIR, { overwrite: true });
console.log("[Atomos Frontend Build]: Done!");
