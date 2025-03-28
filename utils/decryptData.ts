import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_LOGIN_KEY || '');
const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_LOGIN_IV || '');

export const decryptData = (encryptedData: string): string | null => {
  // dont encrypt the data item if its falsey
  if (!encryptedData) {
    return null;
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8); // Convert decrypted data to a readable string
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Decryption error:', err);
    return null;
  }
};
