import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getRecentlyVisitedModules,
  RECENTLY_VISITED_LOCALSTORAGE_KEY
} from '../user-storage';
import { encryptData } from '../encryptData';
import { capitaliseFirstLetter } from '../capitaliseFirstLetter';

export const useTrackRecentlyVisitedModules = () => {
  const storedRecentlyVisited = getRecentlyVisitedModules() || [];
  const pathname: string | null = usePathname();
  const [moduleName, setModuleName] = useState<string>('');
  const [moduleLink, setModuleLink] = useState<string>('');
  const excludedRoutes = [
    '/dashboard',
    '/dashboard/',
    '/login/',
    '/login',
    '/'
  ];

  useEffect(() => {
    if (!pathname || excludedRoutes.includes(pathname)) return;

    const pathArray = pathname.split('/');
    const UATEnvironment = pathArray[pathArray.length - 1];
    const pathSecondaryName = pathArray[pathArray.length - 2] || UATEnvironment;
    const name = `${pathArray[1]} / ${pathSecondaryName}`;
    const path = pathname;

    const capitalizedWord = capitaliseFirstLetter(name);

    setModuleName(capitalizedWord);
    setModuleLink(pathname);

    const uniqueModules = storedRecentlyVisited.filter(
      (module) => module.moduleLink !== path
    );

    uniqueModules.push({ moduleName: capitalizedWord, moduleLink: path });

    const encryptedData = encryptData(JSON.stringify(uniqueModules));
    localStorage.setItem(
      RECENTLY_VISITED_LOCALSTORAGE_KEY,
      encryptedData as string
    );
  }, [pathname]);

  return { moduleName, moduleLink };
};
