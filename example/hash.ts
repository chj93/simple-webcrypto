import { sha256, md5 } from "../src/hash";

(async () => {
  const message = "Hello, World! こんにちは世界 你好，世界 안녕하세요 세계 🌍";
  console.log("message:", message);

  // SHA-256 Hash
  const sha256Hash = await sha256(message);
  console.log("SHA-256 Hash:", Buffer.from(sha256Hash).toString("hex"));

  // MD5 Hash
  const md5Hash = md5(message);
  console.log("MD5 Hash:", md5Hash);
})();
