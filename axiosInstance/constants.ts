const env = process.env.NODE_ENV || 'production';

const SEARCH_BASE_URL = process.env.NEXT_PUBLIC_SEARCH_BASE_URL!;
const REPORT_BASE_URL = process.env.NEXT_PUBLIC_REPORT_BASE_URL!;
const END_OF_DAY_BASE_URL = process.env.NEXT_PUBLIC_END_OF_DAY_BASE_URL!;

const AuthFaBaseUrl = process.env.NEXT_PUBLIC_AUTH_FA_BASE_URL!;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
const endOfdayUrl = process.env.NEXT_PUBLIC_ENDOFDAY_URL!;
const nipBaseUrl = process.env.NEXT_PUBLIC_NIP_BASE_URL!;
const reportsBaseUrl = process.env.NEXT_PUBLIC_REPORTS_BASE_URL!;
const imageUploadBaseUrl = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL!;
export {
  env,
  SEARCH_BASE_URL,
  REPORT_BASE_URL,
  END_OF_DAY_BASE_URL,
  baseUrl,
  nipBaseUrl,
  reportsBaseUrl,
  AuthFaBaseUrl,
  endOfdayUrl,
  imageUploadBaseUrl
};
