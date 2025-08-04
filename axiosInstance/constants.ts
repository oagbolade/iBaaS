export const SEARCH_BASE_URL = 'https://ibaas-search-api.k8.isw.la/api/v1';

export const REPORT_BASE_URL = 'https://ibaas-revamp-reports.k8.isw.la/api';

const env = process.env.NODE_ENV || 'production';

// Assign baseUrl based on environment
const AuthFaBaseUrl =
  env === 'development'
    ? 'https://ibaas-2fa-generator-service.k8.isw.la/api'
    : 'https://ibaas-2fa-generator-service.k8.isw.la/api';
const baseUrl =
  env === 'development'
    ? 'https://iswcbaapi.qa.interswitchng.com/api'
    : 'https://ibaas-api.k8.isw.la/api';

const nipBaseUrl =
  env === 'development'
    ? 'https://nip-core-banking-interface.k8.isw.la/api/v1'
    : 'https://nip-core-banking-interface.k8.isw.la/api/v1';

const reportsBaseUrl =
  env === 'development'
    ? 'https://isw-reportsapi.qa.interswitchng.com/api'
    : 'https://isw-reportsapi.qa.interswitchng.com/api';

export { baseUrl, nipBaseUrl, reportsBaseUrl, AuthFaBaseUrl };
