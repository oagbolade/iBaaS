import CryptoJS from 'crypto-js';

export const decryptData = (encryptedData: string): string | null => {

  if (typeof window !== 'undefined') {
    const key = CryptoJS.enc.Utf8.parse(process.env.NODE_ENV === 'production' ? window.RUNTIME_CONFIG?.NEXT_PUBLIC_LOGIN_KEY : process.env.NEXT_PUBLIC_LOGIN_KEY || '');
    const iv = CryptoJS.enc.Utf8.parse(process.env.NODE_ENV === 'production' ? window.RUNTIME_CONFIG?.NEXT_PUBLIC_LOGIN_IV : process.env.NEXT_PUBLIC_LOGIN_IV || '');

    // dont decrypt the data item if its falsey
    if (!encryptedData) {
      return null;
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Decryption error:', err);
      return null;
    }
  }

  return null;
};
