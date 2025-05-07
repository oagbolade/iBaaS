import { sanitize } from 'dompurify';

export const handleRedirect = (router: any, link: string = '') => {
  if (!link) return;
  return router.push(sanitize(link));
};
