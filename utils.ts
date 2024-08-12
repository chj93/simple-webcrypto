export function getCrypto(): Crypto {
  if (typeof window !== "undefined" && window.crypto) {
    // browser
    return window.crypto;
  } else if (typeof global !== "undefined" && global.crypto) {
    // node.js
    return global.crypto;
  } else {
    throw new Error("Crypto API not available in this environment");
  }
}
