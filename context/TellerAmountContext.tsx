'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react';

type TellerAmountContextType = {
  tellerAmount: number;
  setTellerAmount: Dispatch<SetStateAction<number>>;
  tellerNumber: string;
  setTellerNumber: Dispatch<SetStateAction<string>>;
};

const initialTellerAmountContext: TellerAmountContextType = {
  tellerAmount: 0,
  setTellerAmount: () => {},
  tellerNumber: '',
  setTellerNumber: () => {}
};

export const TellerAmountContext = createContext<TellerAmountContextType>(
  initialTellerAmountContext
);

export default function TellerAmountContextProvider({ children }: any) {
  const [tellerAmount, setTellerAmount] = useState(0);
  const [tellerNumber, setTellerNumber] = useState('');

  const value = useMemo(
    () => ({
      tellerAmount,
      setTellerAmount,
      tellerNumber,
      setTellerNumber
    }),
    [tellerAmount, tellerNumber]
  );

  return (
    <TellerAmountContext.Provider value={value}>
      {children}
    </TellerAmountContext.Provider>
  );
}