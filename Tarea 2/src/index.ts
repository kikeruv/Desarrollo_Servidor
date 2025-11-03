import express, { static as static_ } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { engine } from 'express-handlebars';

import routes from './app/routes'; // ← estaba './app/routes'

dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketServer(server);

// --- Handlebars (para .handlebars) ---
app.engine('handlebars', engine({ extname: '.handlebars' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname)); // aquí están tus .handlebars (raíz del bundle)

// --- Estáticos ---
app.use('/static', static_(path.join(__dirname, 'public')));

// --- Rutas ---
app.use(routes);

// Home: sirve tu index.html plano
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});

// --- Socket.IO ---
io.on('connection', (socket) => {
  console.log('Cliente conectado', socket.id);

  // responder al "ping" de confirmación del cliente
  socket.on('confirmacion', () => {
    socket.emit('confirmacion'); // devuelve el OK
  });

  // clicks de botón (si decides usarlo)
  socket.on('buttonClick', (datos) => {
    console.log('El usuario hizo click', datos);
  });

  // mensaje enviado por el cliente
  socket.on('messageSent', (payload: { mensaje: string }) => {
    console.log('El usuario mandó un mensaje:', payload);
    // emitir a TODOS (incluyendo al que envió)
    io.emit('messageReceived', payload);
    // si quisieras excluir al emisor: socket.broadcast.emit('messageReceived', payload);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });
});

