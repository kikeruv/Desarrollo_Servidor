import express from 'express';
import { authMiddleware } from './middleware/auth.js';

const app = express();
app.use(express.json());
// Endpoint público
app.get('/test', (req, res) => {
  return res.status(200).json({ mensaje: 'ok' });
});
// Endpoint protegido
app.get('/admin', authMiddleware, (req, res) => {
  return res.status(200).json({ mensaje: 'ok' });
});
// Arranca el server 
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
