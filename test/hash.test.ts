import { sha256, md5 } from "../src/hash";
import * as assert from "assert";

describe("Hash Functions", () => {
  it("should hash correctly with SHA-256", async () => {
    const plainText = "Hello, World!";
    const hash = await sha256(plainText);
    const hashHex = Buffer.from(hash).toString("hex");

    const expectedHash =
      "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"; // "Hello, World!" SHA256
    assert.strictEqual(hashHex, expectedHash);
  });

  it("should hash correctly with MD5", () => {
    const plainText = "Hello, World!";
    const hash = md5(plainText);

    const expectedHash = "65a8e27d8879283831b664bd8b7f0ad4"; // "Hello, World!" MD5 Hash
    assert.strictEqual(hash, expectedHash);
  });
});
