// Configuración express
const express = require("express");
const product_router = require("./src/routes/products.js")
const carts_router = require("./src/routes/carts.js");
const handle_router = require("./src/routes/handlebars.js");

// prueba:
const mongoose_router = require("./src/routes/mongoose.js")

require("dotenv").config();
const mongoose = require("mongoose");
const mongooseURL = process.env.mongooseURL;

const puerto = 8080;
const server = express();

// coonfig. socket.io
const socket = require("socket.io");

const httpServer = server.listen(3000, () => {
  console.log("servidor socket.io iniciando en puerto 3000")
});

const io = socket(httpServer)

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

// prueba
server.use("/api", mongoose_router);


// handlebars
const { engine } = require("express-handlebars");
const { default: userModel } = require("./src/routes/schema.js");



server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views')

server.listen(puerto, () => {
    console.log(`Servidor inciado en puerto: ${puerto}`);
});


// Intentar conectar a BD

try {
  mongoose.connect(mongooseURL);

  server.listen(3080, () => {
    console.log("Base de datos conectada en puerto 3080")
  })
}

catch (err) {
  console.log("No se puede conectar con el servidor de BD")
}