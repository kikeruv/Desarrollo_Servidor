import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  try {
    const header = req.headers['authorization'];
    if (!header) {
      return res.status(401).json({ error: 'Token requerido' });
    }
    
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    const secret = process.env.JWT_SECRET || 'testsecret';
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
