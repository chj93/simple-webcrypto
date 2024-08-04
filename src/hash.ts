const crypto = require("crypto").webcrypto;

export async function sha256(message: string): Promise<Uint8Array> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(message)
  );
  return new Uint8Array(hashBuffer);
}

export function md5(message: string): string {
  return crypto.createHash("md5").update(message).digest("hex");
}