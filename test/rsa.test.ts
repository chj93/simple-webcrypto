import { generateRSAKeyPair, rsaEncrypt, rsaDecrypt } from "../src/rsa";
import assert from "assert";

describe("RSA Encryption", () => {
  it("should yield an encrypted message that is different from the original text", async () => {
    const { publicKey } = await generateRSAKeyPair();
    const message =
      "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍😊";
    const publicKeyBuffer = new Uint8Array(
      await crypto.subtle.exportKey("spki", publicKey)
    );

    const encrypted = await rsaEncrypt(message, publicKeyBuffer);

    assert(
      encrypted instanceof Uint8Array,
      "Encrypted message should be a Uint8Array"
    );
    assert.notDeepStrictEqual(
      new TextDecoder().decode(encrypted),
      message,
      "Encrypted message should not be the same as the original message"
    );
  });
});

describe("RSA Decryption", () => {
  it("should decrypt an encrypted message with CJK and emojis", async () => {
    const { publicKey, privateKey } = await generateRSAKeyPair();
    const message =
      "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍😊";
    const publicKeyBuffer = new Uint8Array(
      await crypto.subtle.exportKey("spki", publicKey)
    );
    const privateKeyBuffer = new Uint8Array(
      await crypto.subtle.exportKey("pkcs8", privateKey)
    );

    const encrypted = await rsaEncrypt(message, publicKeyBuffer);
    const decryptedMessage = await rsaDecrypt(encrypted, privateKeyBuffer);

    assert.strictEqual(
      decryptedMessage,
      message,
      "Decrypted message should match the original message"
    );
  });
});

describe("RSA different encrypted", () => {
  it("should produce different encrypted values when using different key pairs", async () => {
    const { publicKey: publicKey1, privateKey: privateKey1 } =
      await generateRSAKeyPair();
    const { publicKey: publicKey2, privateKey: privateKey2 } =
      await generateRSAKeyPair();
    const message = "Hello, World!";
    const publicKeyBuffer1 = new Uint8Array(
      await crypto.subtle.exportKey("spki", publicKey1)
    );
    const privateKeyBuffer1 = new Uint8Array(
      await crypto.subtle.exportKey("pkcs8", privateKey1)
    );

    const publicKeyBuffer2 = new Uint8Array(
      await crypto.subtle.exportKey("spki", publicKey2)
    );
    const privateKeyBuffer2 = new Uint8Array(
      await crypto.subtle.exportKey("pkcs8", privateKey2)
    );

    const encrypted1 = await rsaEncrypt(message, publicKeyBuffer1);
    const encrypted2 = await rsaEncrypt(message, publicKeyBuffer2);

    assert.notDeepStrictEqual(
      encrypted1,
      encrypted2,
      "Encrypted values should be different when using different key pairs"
    );

    const decryptedMessage1 = await rsaDecrypt(encrypted1, privateKeyBuffer1);
    const decryptedMessage2 = await rsaDecrypt(encrypted2, privateKeyBuffer2);

    assert.strictEqual(
      decryptedMessage1,
      decryptedMessage2,
      "Encrypted values ​​should be same when different key pairs are used"
    );
  });
});
