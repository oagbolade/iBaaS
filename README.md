This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Technical Documentation

- Find the IBaaS technical documentation [here](https://interswitch.atlassian.net/wiki/spaces/PEIA/pages/263192589/IBaaS+Front-end+documentation)
- Find the documentation to our search endpoints hosted internally [here](https://documenter.getpostman.com/view/22973621/2sA3JNcgrs)
- Find the documentation to the core banking APIs managed by our external vendor infosight [here](https://iswcbaapi.qa.interswitchng.com/swagger/index.html) Note: This requires VPN access
- Find all error codes and thier corresponding messages [here](https://docs.google.com/spreadsheets/d/1kQcv6Gm7LfWQAVRkoYoR1eolh5RV9U6E/edit?usp=sharing&ouid=108116198544151815431&rtpof=true&sd=true)

## Deployment

We have two environments: [production](https://ibaas-ui.iswsaas.com/) and [development](http://172.26.40.70:7001/ibaas-ui/login/).

## To deploy to production:

- First of all we need to build the UI on [Jenkins](http://172.254.10.20:8080/job/ibaas-ui/build?delay=0sec).

- Select `dev` and the deployment branch and select `production` as the environment to be used.

- Once the build is done and is successful, copy the build number and send it to a member of the devops team for deployment.

Note: the production deployment utilizes docker therefore a docker file must be present in the root folder.

## To deploy to development:

Note: We have the frontend wrapped in a [java servlet](https://www.geeksforgeeks.org/introduction-java-servlets/).

- Download maven from [here](https://maven.apache.org/download.cgi)

- Run the command `mvn package`. This will generate a war file which can be found in the target folder.

- Access the remote server and copy the generated war file into our remote server `172.26.40.70`.

- From the remote server, go to weblogic admin page and deploy using the generated WAR file.

## To deploy to UAT:

- Every merge to the master branch is automatically deployed to the UAT environment

- It takes about 20 - 30mins for deployments to propagate

** Below is the next.config.js content for UAT deployment **

```javascript
const domain = '';

const nextConfig = {
  trailingSlash: true,
  output: 'export',
  env: {
    DOMAIN: domain
  }
};
```

** Below is the nginx.conf content for UAT deployment **

```bash
# auto detects a good number of processes to run
worker_processes auto;

#Provides the configuration file context in which the directives that affect connection processing are specified.
events {
    # Sets the maximum number of simultaneous connections that can be opened by a worker process.
    worker_connections 8000;
    # Tells the worker to accept multiple connections at a time
    multi_accept on;
}


http {
    # what times to include
    include       /etc/nginx/mime.types;
    # what is the default one
    default_type  application/octet-stream;

    # Sets the path, format, and configuration for a buffered log write
    log_format compression '$remote_addr - $remote_user [$time_local] '
        '"$request" $status $upstream_addr '
        '"$http_referer" "$http_user_agent"';

    server {
        # listen on port 80
        listen 80;

        # save logs here
        access_log /var/log/nginx/access.log compression;

        # where the root here
        root /usr/share/nginx/html;
        # what file to server as index
        index index.html index.htm;

        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to redirecting to index.html
            try_files $uri $uri/ /index.html;
        }

        # Media: images, icons, video, audio, HTC
        location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
          expires 1M;
          access_log off;
          add_header Cache-Control "public";
        }

        # Javascript and CSS files
        location ~* \.(?:css|js)$ {
            try_files $uri =404;
            expires 1y;
            access_log off;
            add_header Cache-Control "public";
        }

        # Any route containing a file extension (e.g. /devicesfile.js)
        location ~ ^.+\..+$ {
            try_files $uri =404;
        }
    }
}
```
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