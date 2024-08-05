import { aesEncrypt, aesDecrypt } from "../src/aes";
import * as assert from "assert";

describe("AES Encryption and Decryption", () => {
  it("should encrypt and decrypt correctly", async () => {
    const key = crypto.getRandomValues(new Uint8Array(16)); // 128-bit key
    const plainText = "Hello, World!";

    const { iv, encrypted } = await aesEncrypt(plainText, key);
    const decryptedText = await aesDecrypt(encrypted, key, iv);

    assert.strictEqual(decryptedText, plainText);
  });
});
