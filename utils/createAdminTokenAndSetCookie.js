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

  const isLocalhost = process.env.NODE_ENV !== "production";

  response.cookie('admin-auth-token', token, {
    httpOnly: true,
    secure: !isLocalhost,        // localhost → false, vercel → true
    sameSite: isLocalhost ? "Lax" : "None",  // localhost → Lax, vercel → None
    maxAge: 3 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  return token;
};

export default createAdminAuthTokenAndSetCookie;
