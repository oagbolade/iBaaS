export {};

declare global {
  interface Window {
    RUNTIME_CONFIG: {
      // === Core Secrets ===
      NEXT_PUBLIC_LOGIN_KEY: string;
      NEXT_PUBLIC_LOGIN_IV: string;
      NEXT_PUBLIC_NIP_USERNAME: string;
      NEXT_PUBLIC_NIP_PASSWORD: string;

      // === Environment ===
      NEXT_PUBLIC_ENVIRONMENT: string;
      NEXT_PUBLIC_ENABLE_2FA: string | boolean;
      NEXT_PUBLIC_ENV: string;

      // === Base URLs ===
      NEXT_PUBLIC_SEARCH_BASE_URL: string;
      NEXT_PUBLIC_REPORT_BASE_URL: string;
      NEXT_PUBLIC_END_OF_DAY_BASE_URL: string;
      NEXT_PUBLIC_AUTH_2FA_BASE_URL: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_ENDOFDAY_URL: string;
      NEXT_PUBLIC_NIP_BASE_URL: string;
      NEXT_PUBLIC_REPORTS_BASE_URL: string;
      NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL: string;
    };
  }
}
