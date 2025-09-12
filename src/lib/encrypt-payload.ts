import crypto from "crypto";

export function encryptPayload(
  sharedKeyBase64: string,
  payloadObj: Record<string, unknown>,
): string {
  const key = Buffer.from(sharedKeyBase64, "base64"); // 32 bytes
  const iv = crypto.randomBytes(12); // recommended 12 bytes for AES-GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(payloadObj), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  // return iv + tag + ciphertext in base64
  return Buffer.concat([iv, tag, ciphertext]).toString("base64url");
}
