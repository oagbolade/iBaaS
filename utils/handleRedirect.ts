// import { sanitize } from 'dompurify';
import DOMPurify from 'dompurify';

export const handleRedirect = (router: any, link: string = '') => {
  if (!link) return;
  return router.push(DOMPurify.sanitize(link));
};
