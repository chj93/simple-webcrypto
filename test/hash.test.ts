import { sha256, md5 } from "../src/hash";
import * as assert from "assert";

describe("Hash Functions", () => {
  it("should hash correctly with SHA-256", async () => {
    const message =
      "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍";
    const hash = await sha256(message);
    const hashHex = Buffer.from(hash).toString("hex");

    const expectedHash =
      "7dee6643be095a58f45b3deab4d4acc2485c4a10d0953e96685678de86865386"; // message SHA256
    assert.strictEqual(hashHex, expectedHash);
  });

  it("should hash correctly with MD5", () => {
    const message =
      "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍";
    const hash = md5(message);

    const expectedHash = "368089cd7ed1af6c1f3e181d81176b23"; // message MD5
    assert.strictEqual(hash, expectedHash);
  });
});
