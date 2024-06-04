import cryptoJS from "crypto-js";

export const encrypting = (value: string) => {
  const encrypt_text = cryptoJS.AES.encrypt(
    String(value),
    process.env.ENCRYPTION_KEY!
  ).toString();
  const parse = cryptoJS.enc.Base64.parse(encrypt_text);
  const eHex = parse.toString(cryptoJS.enc.Hex);
  return eHex;
};

export const decrypting = (value: string) => {
  const reb64 = cryptoJS.enc.Hex.parse(value);
  const bytes = reb64.toString(cryptoJS.enc.Base64);
  const decrypt = cryptoJS.AES.decrypt(bytes, process.env.ENCRYPTION_KEY!);
  const plain = decrypt.toString(cryptoJS.enc.Utf8);
  return Number(plain);
};
