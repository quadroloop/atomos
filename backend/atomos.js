const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const moment = require("moment");
const os = require("os");
const logger = require("node-color-log");
const qrcode = require("qrcode-terminal");
const path = require("path");

const morgan = require("morgan");

const app = express();
const http = require("http").Server(app);
const { Server } = require("socket.io");

require("dotenv").config();
// set up socket.io websockets
const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const SERVER_PORT = process.env.PORT || 8000;

app.use(express.static("app-build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static("../app-buid/"));

http.listen(SERVER_PORT);

function getIP() {
  var ifaces = os.networkInterfaces();
  var ip;
  ip = ifaces["en0"].find((x) => x.family === "IPv4").address;

  return ip;
}

const SERVER_URL = `http://${getIP()}:${SERVER_PORT}`;

logger.color("cyan").log("⬢[ATOMOS] > Starting server..");
logger.color("blue").log("⬢[ATOMOS] > Server Ready! connect via QR code:");
qrcode.generate(SERVER_URL, { small: true });
logger.color("yellow").log("Instance URL => ", SERVER_URL);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app-build/index.html"));
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

io.on("connection", (socket) => {
  socket.on("ws-test", () => {
    console.log("[ATOMOS - data recieved from websockets");
  });
});
