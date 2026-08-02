// TODO: Secure this with a token from the device and supabase auth
import { SignJWT } from "jose";
const JWT_SECRET = process.env.JWT_SECRET;
export async function GET() {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("31d")
    .sign(secret);
  return Response.json({ message: "Token API is working", token });
}
