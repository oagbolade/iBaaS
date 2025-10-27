// This copy of the const file is for testing purposes only.
// It allows us to point to different base URLs when running in different environments.
// Specifically used when running kubernetes locally with minikube.

const env = process.env.NODE_ENV || 'production';

const SEARCH_BASE_URL =
  typeof window !== 'undefined' && env !== 'development'
    ? 'https://ibaas-search-api.k9.isw.la/api/v1'
    : `${process.env.NEXT_PUBLIC_SEARCH_BASE_URL}/api/v1`;

const REPORT_BASE_URL = `${typeof window !== 'undefined' && env !== 'development'
  ? 'https://ibaas-revamp-reports.k9.isw.la'
  : process.env.NEXT_PUBLIC_REPORT_BASE_URL
  }/api`;

const END_OF_DAY_BASE_URL = `${typeof window !== 'undefined' && env !== 'development'
  ? 'http://ibaas-endofbusinessprocess.k9.isw.la'
  : process.env.NEXT_PUBLIC_END_OF_DAY_BASE_URL
  }/api`;

const AuthFaBaseUrl = `${typeof window !== 'undefined' && env !== 'development'
  ? 'https://ibaas-2fa-generator-service.k9.isw.la'
  : process.env.NEXT_PUBLIC_AUTH_FA_BASE_URL
  }/api`;

const baseUrl = `${typeof window !== 'undefined' && env !== 'development'
  ? 'https://ibaas-api.k9.isw.la'
  : process.env.NEXT_PUBLIC_BASE_URL
  }/api`;

const endOfdayUrl = `${typeof window !== 'undefined' && env !== 'development'
  ? 'https://ibaas-endofbusinessprocess.k9.isw.la'
  : process.env.NEXT_PUBLIC_ENDOFDAY_URL
  }/api`;

const nipBaseUrl =
  typeof window !== 'undefined' && env !== 'development'
    ? 'https://nip-core-banking-interface.k9.isw.la/api/v1'
    : `${process.env.NEXT_PUBLIC_NIP_BASE_URL}/api/v1`;

const reportsBaseUrl = typeof window !== 'undefined' && env !== 'development' ? 'https://ibaas-revamp-reports.k9.isw.la/api' : `${process.env.NEXT_PUBLIC_REPORTS_BASE_URL}/api`;

const imageUploadBaseUrl = `${typeof window !== 'undefined' && env !== 'development'
  ? 'https://ibaasfilestorage.k9.isw.la'
  : process.env.NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL
  }/api`;

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
