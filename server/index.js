// import { WebSocketServer } from "ws";
// import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";
// import express from "express";

// const wss = new WebSocketServer({ noServer: true });

// const server = express();
// server.on("upgrade", (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (socket) => {
//     wss.emit("connection", socket, request);
//   });
// });

// const adapter = new NodeWSServerAdapter(wss);

// server.listen(8080);

import { WebSocketServer } from "ws";
import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";

const wss = new WebSocketServer({ port: 3030 });
const adapter = new NodeWSServerAdapter(wss);

wss.on("listening", () => {
  console.log("Automerge WebSocket server listening on ws://localhost:3030");
});

wss.on("connection", (ws) => {
  console.log("New client connected");
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
