// Configuración express
const express = require("express");
const product_router = require("./src/routes/products.js")
const carts_router = require("./src/routes/carts.js");
const handle_router = require("./src/routes/handlebars.js");


const puerto = 8080;
const server = express();

// coonfig. socket.io
const socket = require("socket.io");

const httpServer = socket.listen(3000, () => {
  console.log("servidor socket.io iniciando en puerto 3000")
});

const io = new socket(httpServer, {
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado (${socket.id})`);

  socket.emit("server_confirm", "Conexión recibida");

  socket.on("new_message", (data) => {
    io.emit("msg_recieved", data)
  });

  socket.on("disconnect", (reason) => {
    console.log(`Cliente desconectado (${socket.id}) : ${reason}`);
  });
});






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