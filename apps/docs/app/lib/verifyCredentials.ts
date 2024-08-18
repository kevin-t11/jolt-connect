import db from "@jolt-connect/db";
import { compare } from "bcrypt";
import { JWTPayload, SignJWT, importJWK } from 'jose';

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || 'secret';

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(jwk);

  return jwt;
};

export async function verifyCredentials(email: string, password: string) {
  // Find user by email
  const user = await db.user.findUnique({
    where: { email },
  });

  if (user && (await compare(password, user.password))) {
    // Return user object if credentials are valid
    const jwt = await generateJWT({
      id: user.id,
    });
    return { id: user.id, email: user.email , jwtToken: jwt };
  }

  // Return null if credentials are invalid
  return null;
}
