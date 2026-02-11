const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret";
const COOKIE_NAME = "admin_session";
const EXPIRY_DAYS = 7;

interface SessionPayload {
  email: string;
  name: string;
  picture: string;
  iat: number;
  exp: number;
}

function base64url(str: string): string {
  return btoa(str)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded);
}

async function sign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export async function createSessionToken(user: {
  email: string;
  name: string;
  picture: string;
}): Promise<string> {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      email: user.email,
      name: user.name,
      picture: user.picture,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + EXPIRY_DAYS * 24 * 60 * 60,
    })
  );
  const signature = await sign(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSig = await sign(`${header}.${payload}`);
    if (signature !== expectedSig) return null;

    const data: SessionPayload = JSON.parse(base64urlDecode(payload));
    if (data.exp < Math.floor(Date.now() / 1000)) return null;

    return data;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, EXPIRY_DAYS };
