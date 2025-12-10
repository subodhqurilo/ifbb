import { SignJWT } from 'jose';

const createUserAuthTokenAndSetCookie = async (userId, email, response) => {
  const secret = new TextEncoder().encode(process.env.USER_SECRET);
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

  // response.cookie('user-auth-token', token, {
  //   httpOnly: true,
  //   secure: true, // Must be true for sameSite: 'none'
  //   sameSite: 'none', // Required for cross-origin requests
  //   maxAge: 3 * 24 * 60 * 60 * 1000,
  //   path: '/',
  //   // partitioned: true,
  // });
  return token;
};
export default createUserAuthTokenAndSetCookie;
