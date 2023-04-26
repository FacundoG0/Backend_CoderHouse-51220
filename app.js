// Configuración express
const express = require("express");
const product_router = require("./src/routes/products.js")
const carts_router = require("./src/routes/carts.js");
const handle_router = require("./src/routes/handlebars.js");


const puerto = 8080;
const server = express();

// coonfig. socket.io
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  // ...
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);






server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Invocación de routers
server.use("/api", product_router);
server.use("/api", carts_router);
server.use("/api", handle_router);

// handlebars
const { engine } = require("express-handlebars");



server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views')

server.listen(puerto, () => {
    console.log(`Servidor inciado en puerto: ${puerto}`);
});