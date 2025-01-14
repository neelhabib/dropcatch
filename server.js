const express = require("express");
const next = require("next");
const http = require("http"); // Required for socket.io integration
const { Server } = require("socket.io");
const GodaddyDropCatch = require("./SocketFunction/DropCatch/Godaddy");
const NameCheapDropCatch = require("./SocketFunction/DropCatch/NameCheap");
const DynadotDropCatch = require("./SocketFunction/DropCatch/Dynadot");
const NameSiloDropCatch = require("./SocketFunction/DropCatch/NameSilo");
const SpaceShipDropCatch = require("./SocketFunction/DropCatch/SpaceShip");
const AutoCatchInterval = require("./SocketFunction/AutoCatch");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = async () => {
  await app.prepare();

  const server = express();
  server.use(express.static("public"));
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  server.use(express.static("public"));

  AutoCatchInterval();

  io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("namecheap-dropcatch", (domain) =>
      NameCheapDropCatch(socket, domain)
    );
    socket.on("dynadot-dropcatch", (domain) =>
      DynadotDropCatch(socket, domain)
    );
    socket.on("namesilo-dropcatch", (domain) =>
      NameSiloDropCatch(socket, domain)
    );

    socket.on("godaddy-dropcatch", (domain) =>
      GodaddyDropCatch(socket, domain)
    );
    socket.on("spaceship-dropcatch", (domain) =>
      SpaceShipDropCatch(socket, domain)
    );
    socket.on("disconnect", () => {
      console.log("disconnected:", socket.id);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  return httpServer;
};

// app.prepare().then(() => {
//   const server = express();

//   const httpServer = http.createServer(server);
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("connected", socket.id);

//     socket.on("namecheap-dropcatch", (domain) =>
//       NameCheapDropCatch(socket, domain)
//     );
//     socket.on("dynadot-dropcatch", (domain) =>
//       DynadotDropCatch(socket, domain)
//     );
//     socket.on("namesilo-dropcatch", (domain) =>
//       NameSiloDropCatch(socket, domain)
//     );

//     socket.on("godaddy-dropcatch", (domain) =>
//       GodaddyDropCatch(socket, domain)
//     );
//     socket.on("spaceship-dropcatch", (domain) =>
//       SpaceShipDropCatch(socket, domain)
//     );
//     socket.on("disconnect", () => {
//       console.log("disconnected:", socket.id);
//     });
//   });

//   server.use(express.static("public"));
//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   httpServer.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });
module.exports = createServer;
