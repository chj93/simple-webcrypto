import { sha256, md5 } from "../src/hash";

(async () => {
  const plainText = "Hello, World!";
  console.log("plainText:", plainText);

  // SHA-256 Hash
  const sha256Hash = await sha256(plainText);
  console.log("SHA-256 Hash:", Buffer.from(sha256Hash).toString("hex"));

  // MD5 Hash
  const md5Hash = md5(plainText);
  console.log("MD5 Hash:", md5Hash);
})();
