import { generateRSAKeyPair, rsaEncrypt, rsaDecrypt } from "../src/rsa";

(async () => {
  const { publicKey, privateKey } = await generateRSAKeyPair();

  const message = "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍";
  const publicKeyBuffer = new Uint8Array(
    await crypto.subtle.exportKey("spki", publicKey)
  );
  const privateKeyBuffer = new Uint8Array(
    await crypto.subtle.exportKey("pkcs8", privateKey)
  );
  console.log("message:", message);

  // RSA Encryption
  const encrypted = await rsaEncrypt(message, publicKeyBuffer);
  console.log("Encrypted Text:", Buffer.from(encrypted).toString("hex"));

  // RSA Decryption
  const decryptedText = await rsaDecrypt(encrypted, privateKeyBuffer);
  console.log("Decrypted Text:", decryptedText);
})();
