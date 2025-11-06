import jwt from 'jsonwebtoken';

/**
 * Middleware de autenticación.
 * Espera header: Authorization: Bearer <token>
 * Valida con JWT_SECRET (o 'testsecret' en pruebas) y coloca el payload en req.user
 */
export function auth(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    const [scheme, token] = authHeader.split(' ');
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

export default { auth };
