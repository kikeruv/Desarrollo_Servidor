import express, { static as static_ } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { engine } from 'express-handlebars';

dotenv.config();

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

// Esto conecta y crea el servidor.
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(() => {
  console.log('Error al conectarse a la base de datos')
})