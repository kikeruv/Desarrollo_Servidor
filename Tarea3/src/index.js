import express from 'express';
import { auth } from './ejercico_3/auth.js';

const app = express();
app.use(express.json());
// Endpoint público
app.get('/test', (req, res) => {
  return res.status(200).json({ mensaje: 'ok' });
});
// Endpoint protegido
app.get('/admin', auth, (req, res) => {
  return res.status(200).json({ mensaje: 'ok' });
});

export default app

// Arranca el server 
  const PORT = 3000;
  app.listen(PORT, () => console.log(`API is working in http://localhost:${PORT}`));
