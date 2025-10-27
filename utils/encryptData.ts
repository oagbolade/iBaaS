import CryptoJS from 'crypto-js';

export const encryptData = (data: string | null): string | null => {
  // dont encrypt the data item if its falsey
  if (!data) {
    return data;
  }

  if (typeof window !== 'undefined') {
    const key = CryptoJS.enc.Utf8.parse(process.env.NODE_ENV === 'production' ? window.RUNTIME_CONFIG?.NEXT_PUBLIC_LOGIN_KEY : process.env.NEXT_PUBLIC_LOGIN_KEY || '' );
    const iv = CryptoJS.enc.Utf8.parse(process.env.NODE_ENV === 'production' ? window.RUNTIME_CONFIG?.NEXT_PUBLIC_LOGIN_IV : process.env.NEXT_PUBLIC_LOGIN_IV || '' );

    try {
      // const { key, iv } = await getEncryptionParams();
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
  }

  return null;
};
