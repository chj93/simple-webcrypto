import { aesEncrypt, aesDecrypt } from "../src/aes";
import assert from "assert";

describe("AES Encryption", () => {
  it("should yield an encrypted message that is different from the original text", async () => {
    const key = crypto.getRandomValues(new Uint8Array(16)); // 128bit
    const message =
      "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍😊";

    const { iv, encrypted } = await aesEncrypt(message, key);
    assert(
      encrypted instanceof Uint8Array,
      "Encrypted message should be a Uint8Array"
    );
    assert(iv instanceof Uint8Array, "IV should be a Uint8Array");
    assert.notDeepStrictEqual(
      new TextDecoder().decode(encrypted),
      message,
      "Encrypted message should not be the same as the original message"
    );
  });
});

describe("AES Decryption", () => {
  it("should yield decrypted text that is exactly the same as the original text", async () => {
    const key = crypto.getRandomValues(new Uint8Array(16)); // 128bit
    const message =
      "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍😊";

    const { iv, encrypted } = await aesEncrypt(message, key);
    const decryptedMessage = await aesDecrypt(encrypted, key, iv);

    assert.strictEqual(
      decryptedMessage,
      message,
      "Decrypted message should match the original message"
    );
  });
});
