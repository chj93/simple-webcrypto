export async function getCrypto(): Promise<Crypto> {
  if (typeof window !== "undefined" && window.crypto) {
    return window.crypto;
  } else {
    const { webcrypto } = await import("crypto");
    return webcrypto as unknown as Crypto;
  }
}
