import { aesEncrypt, aesDecrypt } from "../src/aes";

(async () => {
  const key = crypto.getRandomValues(new Uint8Array(16));
  const plainText = "Hello, World!";
  console.log("plainText:", plainText);

  // AES Encryption
  const { iv, encrypted } = await aesEncrypt(plainText, key);
  console.log("Encrypted Text:", Buffer.from(encrypted).toString("hex"));

  // AES Decryption
  const decryptedText = await aesDecrypt(encrypted, key, iv);
  console.log("Decrypted Text:", decryptedText);
})();
