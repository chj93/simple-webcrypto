# simple-webcrypto

AES, RSA encryption/decryption and SHA, MD5 hashing using [Web Crypto API](https://nodejs.org/api/webcrypto.html) in Node.js
Node.js의 [Web Crypto API](https://nodejs.org/api/webcrypto.html)를 이용해 AES, RSA 암·복호화, SHA, MD5 암호화를 지원

## Installation

```bash
npm i simple-webcrypto
```

or

```bash
yarn add simple-webcrypto
```

or

```bash
pnpm add simple-webcrypto
```

## Usage

```tsx
import {
  aesEncrypt,
  aesDecrypt,
  generateRSAKeyPair,
  rsaEncrypt,
  rsaDecrypt,
  sha256,
  md5,
} from "crypto-utils";

// Example AES usage
(async () => {
  // AES key should be 128, 192, or 256 bits (16, 24, or 32 bytes)
  const key = crypto.getRandomValues(new Uint8Array(16));
  const plainText = "Hello, World!";

  const { iv, encrypted } = await aesEncrypt(plainText, key);
  const decryptedText = await aesDecrypt(encrypted, key, iv);

  console.log("Decrypted Text:", decryptedText);
})();

// Example RSA usage
(async () => {
  const { publicKey, privateKey } = await generateRSAKeyPair();

  const plainText = "Hello, World!";
  const publicKeyBuffer = new Uint8Array(
    await crypto.subtle.exportKey("spki", publicKey)
  );
  const privateKeyBuffer = new Uint8Array(
    await crypto.subtle.exportKey("pkcs8", privateKey)
  );

  const encrypted = await rsaEncrypt(plainText, publicKeyBuffer);
  const decryptedText = await rsaDecrypt(encrypted, privateKeyBuffer);

  console.log("Decrypted Text:", decryptedText);
})();

// Example SHA and MD5 usage
(async () => {
  const plainText = "Hello, World!";

  const sha256Hash = await sha256(plainText);
  console.log("SHA-256 Hash:", Buffer.from(sha256Hash).toString("hex"));

  const md5Hash = md5(plainText);
  console.log("MD5 Hash:", md5Hash);
})();
```

## License

Open source [licensed as MIT](https://github.com/chj93/simple-webcrypto/blob/main/LICENSE).
