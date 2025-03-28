'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react';
import {
  getRecentlyVisitedModules,
  IRecentlyVisited
} from '@/utils/user-storage';

const initialTrackRecentlyVisitedModulesContext = {
  recentlyVisited: [],
  setRecentlyVisitedModules: (() => {}) as Dispatch<
    SetStateAction<IRecentlyVisited[]>
  >
};

type TrackRecentlyVisitedModulesContextType = {
  recentlyVisited: IRecentlyVisited[];
  setRecentlyVisitedModules: Dispatch<SetStateAction<IRecentlyVisited[]>>;
};

export const TrackRecentlyVisitedModulesContext =
  createContext<TrackRecentlyVisitedModulesContextType>(
    initialTrackRecentlyVisitedModulesContext
  );

export default function TrackRecentlyVisitedModulesContextProvider({
  children
}: any) {
  const storedRecentlyVisited = getRecentlyVisitedModules() || [];

  const [recentlyVisited, setRecentlyVisitedModules] = useState<
    IRecentlyVisited[]
  >(storedRecentlyVisited);

  const value: TrackRecentlyVisitedModulesContextType = useMemo(() => {
    return { recentlyVisited, setRecentlyVisitedModules };
  }, [recentlyVisited]);

  return (
    <TrackRecentlyVisitedModulesContext.Provider value={value}>
      {children}
    </TrackRecentlyVisitedModulesContext.Provider>
  );
}
