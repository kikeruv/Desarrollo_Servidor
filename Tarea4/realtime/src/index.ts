import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);
    // Este evento se activa cunado alguien se conecta 
  socket.on("user_connected", (username: string) => {
    socket.broadcast.emit("user_connected", username);
  });
    // Cuando el cliente envia un mensaje, este evento see dispara
  socket.on("message", (data: { user: string; text: string; at: number }) => {
    io.emit("message", data);
  });
    // Cunado alguie se desconecta por cerrar la pestaña
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor Socket.IO en http://localhost:${PORT}`));
