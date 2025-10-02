# API Base URLs Documentation

This document describes all the base URLs used in the project, specifying which ones are for development and which are for UAT (User Acceptance Testing).

---

## 1. `SEARCH_BASE_URL`
- **Purpose:** Search-related API requests.
- **URL:**  
  `https://ibaas-search-api.k8.isw.la/api/v1`
- **Environment:** Same for both development and UAT.

---

## 2. `REPORT_BASE_URL`
- **Purpose:** Reports API.
- **URL:**  
  `https://ibaas-revamp-reports.k8.isw.la/api`
- **Environment:** Same for both development and UAT.

---

## 3. `AuthFaBaseUrl`
- **Purpose:** 2FA (Two-Factor Authentication) generator service.
- **Development URL:**  
  `https://ibaas-2fa-generator-service.k8.isw.la/api`
- **UAT URL:**  
  `https://ibaas-2fa-generator-service.k8.isw.la/api`
- **Note:** Both environments currently use the same URL.

---

## 4. `baseUrl`
- **Purpose:** Main API base URL for core application endpoints.
- **Development URL:**  
  `https://ibaas-api.k9.isw.la/api`
- **UAT URL:**  
  `https://ibaas-api.k8.isw.la/api`

---

## 5. `endOfdayUrl`
- **Purpose:** End-of-business process APIs.
- **Development URL:**  
  `https://ibaas-endofbusinessprocess.k8.isw.la/api`
- **UAT URL:**  
  `https://ibaas-endofbusinessprocess.k8.isw.la/api`
- **Note:** Both environments currently use the same URL.

---

## 6. `nipBaseUrl`
- **Purpose:** NIP (core banking interface) API requests.
- **Development URL:**  
  `https://nip-core-banking-interface.k8.isw.la/api/v1`
- **UAT URL:**  
  `https://nip-core-banking-interface.k8.isw.la/api/v1`
- **Note:** Both environments currently use the same URL.

---

## 7. `reportsBaseUrl`
- **Purpose:** Revamped reports API.
- **Development URL:**  
  `https://ibaas-revamp-reports.k8.isw.la/api`
- **UAT URL:**  
  `https://ibaas-revamp-reports.k8.isw.la/api`
- **Note:** Both environments currently use the same URL.

---

> **Summary:**  
> Only `baseUrl` differs between development and UAT environments. All other URLs are currently the same for both environments, but are structured for easy modification if needed in the future.