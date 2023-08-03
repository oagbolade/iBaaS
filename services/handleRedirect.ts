import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const handleRedirect = (
  router: AppRouterInstance | string[],
  link: string
) => {
  return router.push(link);
};
