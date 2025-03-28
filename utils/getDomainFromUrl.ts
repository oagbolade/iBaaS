export const getDomainFromUrl = (): string | null => {
  if (typeof window !== 'undefined') {
    try {
      const parsedUrl = new URL(window.location.href);
      return `${parsedUrl.protocol}//${parsedUrl.hostname}${
        parsedUrl.port ? `:${parsedUrl.port}` : ''
      }`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Invalid URL:', error);
      return null;
    }
  }

  return null;
};
