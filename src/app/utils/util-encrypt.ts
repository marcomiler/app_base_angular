import { environment } from '@environments/environment';
import * as CryptoJS from 'crypto-js';

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, environment.keyEncrypt).toString();
};

export const decrypt = <T>(value: string): T | null => {
  const valueDecrypt = CryptoJS.AES.decrypt(
    value,
    environment.keyEncrypt
  ).toString(CryptoJS.enc.Utf8);

  return valueDecrypt ? (JSON.parse(valueDecrypt) as T) : null;
};
