import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const handleRedirect = (
  router: AppRouterInstance | string[],
  link?: string | undefined
) => {
  return router.push(link);
};
