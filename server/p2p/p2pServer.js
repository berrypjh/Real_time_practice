const { WebSocketServer } = require("ws");

const initP2PServer = ws_port => {
  const server = new WebSocketServer({ port: ws_port });
  server.on("connection", ws => {
    initConnection(ws);
  });
  server.on("error", () => {
    console.log("error");
  });
  console.log("Listening webSocket port : " + ws_port);
};

let sockets = [];

const initConnection = ws => {
  sockets.push(ws);
  initMessageHandler(ws);
  initErrorHandler(ws);

  // let num = 1;
  // setInterval(() => {
  //   if (sockets.includes(ws)) {
  //     write(ws, num);
  //     num++;
  //   }
  // }, 1000);
};

const initErrorHandler = ws => {
  ws.on("close", () => {
    closeConnection(ws);
  });
  ws.on("error", () => {
    closeConnection(ws);
  });
};

const closeConnection = ws => {
  console.log(`Connection close ${ws.url}`);
  sockets.splice(sockets.indexOf(ws), 1);
};

const write = (ws, message) => {
  ws.send(JSON.stringify(message));
};

const initMessageHandler = ws => {
  ws.on("message", data => {
    const message = JSON.parse(data);
    console.log(message);
  });
};

const broadcast = message => {
  sockets.forEach(socket => {
    write(socket, message);
  });
};

module.exports = {
  initP2PServer,
  broadcast,
};
