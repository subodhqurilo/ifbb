import { jwtVerify } from 'jose';

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies['admin-auth-token'];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);

    const { payload } = await jwtVerify(token, secret, {
      issuer: 'iifb',
      audience: 'iifb-audience',
    });
    req.admin = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default adminAuthMiddleware;
