const env = process.env.NODE_ENV || 'production';

const SEARCH_BASE_URL =
  typeof window !== 'undefined' && env !== 'development'
    ? '/v1'
    : `${process.env.NEXT_PUBLIC_SEARCH_BASE_URL}/api/v1`;

const REPORT_BASE_URL =
  typeof window !== 'undefined' && env !== 'development'
    ? ''
    : `${process.env.NEXT_PUBLIC_REPORTS_BASE_URL}/api`;

const END_OF_DAY_BASE_URL = `${
  typeof window !== 'undefined' && env !== 'development'
    ? ''
    : process.env.NEXT_PUBLIC_END_OF_DAY_BASE_URL
}`;

const AuthFaBaseUrl = `${
  typeof window !== 'undefined' && env !== 'development'
    ? ''
    : process.env.NEXT_PUBLIC_AUTH_FA_BASE_URL
}/api`;

const baseUrl =
  typeof window !== 'undefined' && env !== 'development'
    ? '/api'
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const endOfdayUrl = `${
  typeof window !== 'undefined' && env !== 'development'
    ? ''
    : process.env.NEXT_PUBLIC_ENDOFDAY_URL
}/api`;

const nipBaseUrl =
  typeof window !== 'undefined' && env !== 'development'
    ? '/api/v1'
    : `${process.env.NEXT_PUBLIC_NIP_BASE_URL}/api/v1`;

const imageUploadBaseUrl = `${
  typeof window !== 'undefined' && env !== 'development'
    ? ''
    : process.env.NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL
}/api`;

export {
  env,
  SEARCH_BASE_URL,
  REPORT_BASE_URL,
  END_OF_DAY_BASE_URL,
  baseUrl,
  nipBaseUrl,
  AuthFaBaseUrl,
  endOfdayUrl,
  imageUploadBaseUrl
};
