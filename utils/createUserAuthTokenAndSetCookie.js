import { SignJWT } from 'jose';

const createUserAuthTokenAndSetCookie = async (userId, email, response) => {
  // Use the correct .env variable
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // Create token
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('3d')
    .sign(secret);

  // Set cookie (works on localhost)
  response.cookie('user-auth-token', token, {
    httpOnly: true,
    secure: false,          // false on localhost
    sameSite: 'lax',        // lax works locally (none breaks)
    maxAge: 3 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  return token;
};

export default createUserAuthTokenAndSetCookie;
