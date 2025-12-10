import { SignJWT } from 'jose';

const createAdminAuthTokenAndSetCookie = async (userId, email, response) => {
  const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);

  const token = await new SignJWT({
    userId,
    email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('iifb')
    .setAudience('iifb-audience')
    .setExpirationTime('3d')
    .sign(secret);

  response.cookie('admin-auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 3 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  return token;
};

export default createAdminAuthTokenAndSetCookie;
