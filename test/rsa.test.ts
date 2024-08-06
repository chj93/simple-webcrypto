import { generateRSAKeyPair, rsaEncrypt, rsaDecrypt } from "../src/rsa";
import * as assert from "assert";

describe("RSA Encryption and Decryption", () => {
  it("should encrypt and decrypt correctly", async () => {
    const { publicKey, privateKey } = await generateRSAKeyPair();
    const message = "Hello, World!";

    const publicKeyBuffer = new Uint8Array(
      await crypto.subtle.exportKey("spki", publicKey)
    );
    const privateKeyBuffer = new Uint8Array(
      await crypto.subtle.exportKey("pkcs8", privateKey)
    );

    const encrypted = await rsaEncrypt(message, publicKeyBuffer);
    const decryptedText = await rsaDecrypt(encrypted, privateKeyBuffer);

    assert.strictEqual(decryptedText, message);
  });
});
