import { aesEncrypt, aesDecrypt } from "../src/aes";

(async () => {
  const key = crypto.getRandomValues(new Uint8Array(16));
  const message =
    "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍";
  console.log("message:", message);

  // AES Encryption
  const { iv, encrypted } = await aesEncrypt(message, key);
  console.log("Encrypted Text:", Buffer.from(encrypted).toString("hex"));

  // AES Decryption
  const decryptedText = await aesDecrypt(encrypted, key, iv);
  console.log("Decrypted Text:", decryptedText);
})();
