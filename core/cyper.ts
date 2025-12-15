import "dotenv/config";
import CryptoJS from "crypto-js";

const secretkey = process.env.secretkey || "no secret";
export function encrypt(API: string): string {
  return CryptoJS.AES.encrypt(API, secretkey).toString();
}

export function decrypt(API: string): string {
  var bytes = CryptoJS.AES.decrypt(API, secretkey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
