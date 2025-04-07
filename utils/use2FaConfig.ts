// lib/2fa-config.ts
export const twoFactorConfig = {
  is2FADisabled: process.env.NEXT_PUBLIC_ENABLE_2FA === 'false'
};

/**
 * Utility function to check if 2FA should be enforced
 */
export function shouldEnforce2FA(): boolean {
  return !twoFactorConfig.is2FADisabled;
}
