import { generateRSAKeyPair, rsaEncrypt, rsaDecrypt } from "../src/rsa";

(async () => {
  const { publicKey, privateKey } = await generateRSAKeyPair();

  const plainText = "Hello, World!";
  const publicKeyBuffer = new Uint8Array(
    await crypto.subtle.exportKey("spki", publicKey)
  );
  const privateKeyBuffer = new Uint8Array(
    await crypto.subtle.exportKey("pkcs8", privateKey)
  );
  console.log("plainText:", plainText);

  // RSA Encryption
  const encrypted = await rsaEncrypt(plainText, publicKeyBuffer);
  console.log("Encrypted Text:", Buffer.from(encrypted).toString("hex"));

  // RSA Decryption
  const decryptedText = await rsaDecrypt(encrypted, privateKeyBuffer);
  console.log("Decrypted Text:", decryptedText);
})();
