import { jwtVerify } from 'jose';

const optionalUserAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) return next();

    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.USER_SECRET);

    const { payload } = await jwtVerify(token, secret, {
      issuer: 'iifb',
      audience: 'iifb-audience',
    });

    req.user = {
      userId: payload.userId,
      email: payload.email,
    };
  } catch (err) {
    console.warn('Optional auth: token invalid or expired');
  }

  next();
};

export default optionalUserAuthMiddleware;
