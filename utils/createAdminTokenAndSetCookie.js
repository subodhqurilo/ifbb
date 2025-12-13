import { SignJWT } from "jose";

const createAdminAuthTokenAndSetCookie = async (userId, email, res) => {
  const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);

  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("iifb")
    .setAudience("iifb-audience")
    .setExpirationTime("3d")
    .sign(secret);

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("admin-auth-token", token, {
    httpOnly: true,

    // 🔐 HTTPS only in production
    secure: isProduction,

    /**
     * 🌍 Cookie strategy:
     * - Localhost / dev → Lax (works on same-site, no HTTPS needed)
     * - Production → None (allows cross-site, requires HTTPS)
     */
    sameSite: isProduction ? "none" : "lax",

    /**
     * 🏠 Domain handling:
     * - DO NOT set domain on localhost (browser issues)
     * - Set top-level domain in production
     */
    ...(isProduction && { domain: process.env.COOKIE_DOMAIN }), 
    // example: .ifbb.com

    path: "/",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createAdminAuthTokenAndSetCookie;
