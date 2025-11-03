import express, { static as static_ } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { engine } from 'express-handlebars';

dotenv.config();

import {Server} from 'http'
import {Server as SocketServer} from 'socket.io'

// Importamos todo esto para la base de datos
import database from '../database.json';
import { dbConnect } from './database/index';

// Importamos los rauters de app ya que contiene todos los rauters
import routes from './app/routes';

// Importamos las carpetas de archivos
import { ejemplo } from './app/ejemplo2/ejemplo';
import { index } from './app/ejemplo1';

const PORT = process.env.PORT || 3000;

const app = express();

// Configuracion de handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Imprimimos lo que se importa en ejemplos
console.log('Ejemplo 1 sin poner en la ruta el nombre del archivo index:', index);
console.log('Ejemplo 2 poniendo la ruta con el nombre del archivo:', ejemplo);

app.use(routes);

app.use('/static', static_(path.join(__dirname, '..', 'public')));

app.get('', (req, res) => {
console.log("Database: ", database);
  // res.send("API works");
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('index', {
    nombre: "Velita",
    usuarios: [
      { id: 1, nombre: "pablo" },
      { id: 2, nombre: "juan" }
    ]
  }); 
});

// Esto conecta y crea el servidor. Pero tambien creo todo lo relacionado a Sockets
dbConnect().then(() => {
  const server: Server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });

    const io = new SocketServer(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('Se creó una nueva conexión');

    // Confirmación inicial
    socket.emit('confirmacion');

    // Guardar nombre y sala actual
    socket.data.usuario = { nombre: null, sala: null };

    // Registrar nombre
    socket.on('register', (nombre: string) => {
      socket.data.usuario.nombre = nombre;
      console.log(`${nombre} se ha registrado`);
    });

    // Entrar a una sala
    socket.on('join', (sala: string) => {
      const { nombre } = socket.data.usuario;
      if (!nombre) return;

      if (socket.data.usuario.sala) {
        socket.leave(socket.data.usuario.sala);
      }
      socket.join(sala);
      socket.data.usuario.sala = sala;

      io.to(sala).emit('system', {
        text: `${nombre} se ha unido a la sala ${sala}`,
        ts: new Date().toISOString(),
      });
    });

    // Enviar mensaje
    socket.on('message', (mensaje: string) => {
      const { nombre, sala } = socket.data.usuario;
      if (!sala || !nombre) return;
      const msg = { from: nombre, text: mensaje, ts: new Date().toISOString() };
      io.to(sala).emit('message', msg);
    });

    // Salir de sala
    socket.on('leave', () => {
      const { nombre, sala } = socket.data.usuario;
      if (!sala) return;
      socket.leave(sala);
      io.to(sala).emit('system', {
        text: `${nombre} ha salido de la sala ${sala}`,
        ts: new Date().toISOString(),
      });
      socket.data.usuario.sala = null;
    });

    // Cerrar sesión
    socket.on('logout', () => {
      const { nombre, sala } = socket.data.usuario;
      if (sala) {
        io.to(sala).emit('system', {
          text: `${nombre} cerró sesión`,
          ts: new Date().toISOString(),
        });
        socket.leave(sala);
      }
      socket.data.usuario = { nombre: null, sala: null };
    });

    // Desconexión
    socket.on('disconnect', () => {
      console.log('Alguien salió');
      const { nombre, sala } = socket.data.usuario;
      if (sala && nombre) {
        io.to(sala).emit('system', {
          text: `${nombre} se desconectó`,
          ts: new Date().toISOString(),
        });
      }
    });
  });

}).catch(() => {
  console.log('Error al conectarse a la base de datos')
})