'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react';

export type SetupAndCustomerType = {
  stateCode: number;
  emailalert: boolean;
  smsalert: boolean;
};

const initialSetupAndCustomerModuleContext = {
  setupAndCustomerData: {
    stateCode: 0,
    emailalert: false,
    smsalert: false
  },

  setSetupAndCustomerData: (() => {}) as Dispatch<
    SetStateAction<SetupAndCustomerType>
  >
};

type SetupAndCustomerModuleContextType =
  typeof initialSetupAndCustomerModuleContext;

export const SetupAndCustomerModuleContext =
  createContext<SetupAndCustomerModuleContextType>(
    initialSetupAndCustomerModuleContext
  );

export default function SetupAndCompanyModuleContextProvider({
  children
}: any) {
  const [setupAndCustomerData, setSetupAndCustomerData] =
    useState<SetupAndCustomerType>({
      stateCode: 0,
      emailalert: false,
      smsalert: false
    });

  const value: SetupAndCustomerModuleContextType = useMemo(() => {
    return {
      setupAndCustomerData,
      setSetupAndCustomerData
    };
  }, [setupAndCustomerData]);

  return (
    <SetupAndCustomerModuleContext.Provider value={value}>
      {children}
    </SetupAndCustomerModuleContext.Provider>
  );
}
