import { aesEncrypt, aesDecrypt } from "../src/aes";
import * as assert from "assert";

describe("AES Encryption and Decryption", () => {
  it("should encrypt and decrypt correctly", async () => {
    const key = crypto.getRandomValues(new Uint8Array(16)); // 128-bit key
    const message = "Hello, World!";

    const { iv, encrypted } = await aesEncrypt(message, key);
    const decryptedText = await aesDecrypt(encrypted, key, iv);

    assert.strictEqual(decryptedText, message);
  });
});
