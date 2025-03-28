import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_LOGIN_KEY || '');
const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_LOGIN_IV || '');

export const encryptData = (data: string | null): string | null => {
  // dont encrypt the data item if its falsey
  if (!data) {
    return data;
  }

  try {
    const encrypted = CryptoJS.AES.encrypt(data || '', key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Encryption error:', err);
    return null;
  }
};
