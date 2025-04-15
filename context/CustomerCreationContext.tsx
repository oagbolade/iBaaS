'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react';

export type ProgressType = {
  total: number;
  progress: number;
};

export const progressCompletionInitialValues: Record<string, ProgressType> = {
  corporateCustomerPersonalDetails: {
    total: 20,
    progress: 0
  },
  personalDetails: {
    total: 20,
    progress: 0
  },
  businessDetails: {
    total: 6,
    progress: 0
  },
  nextOfKinDetails: {
    total: 6,
    progress: 0
  },
  identificationDetails: {
    total: 4,
    progress: 0
  },
  referrerDetails: {
    total: 3,
    progress: 0
  }
};

const initialCustomerCreationContext = {
  accountOfficerValue: '',
  introducerIdValue: '',
  introducerTypeValue: '',
  customerType: '',
  completed: progressCompletionInitialValues,
  setAccountOfficerValue: (() => {}) as Dispatch<SetStateAction<string>>,
  setIntroducerIdValue: (() => {}) as Dispatch<SetStateAction<string>>,
  setIntroducerTypeValue: (() => {}) as Dispatch<SetStateAction<string>>,
  setCustomerType: (() => {}) as Dispatch<SetStateAction<string>>,
  setCompleted: (() => {}) as Dispatch<
    SetStateAction<Record<string, ProgressType>>
  >
};

type CustomerCreationContextType = typeof initialCustomerCreationContext;

export const CustomerCreationContext =
  createContext<CustomerCreationContextType>(initialCustomerCreationContext);

export default function CustomerCreationContextProvider({ children }: any) {
  const [accountOfficerValue, setAccountOfficerValue] = useState<string>('');
  const [introducerIdValue, setIntroducerIdValue] = useState<string>('');
  const [introducerTypeValue, setIntroducerTypeValue] = useState<string>('');
  const [customerType, setCustomerType] = useState('individual');
  const [completed, setCompleted] = useState<Record<string, ProgressType>>(
    progressCompletionInitialValues
  );

  const value: CustomerCreationContextType = useMemo(() => {
    return {
      customerType,
      setCustomerType,
      accountOfficerValue,
      setAccountOfficerValue,
      introducerIdValue,
      setIntroducerIdValue,
      introducerTypeValue,
      setIntroducerTypeValue,
      completed,
      setCompleted
    };
  }, [accountOfficerValue, introducerIdValue, customerType, completed, introducerTypeValue]);

  return (
    <CustomerCreationContext.Provider value={value}>
      {children}
    </CustomerCreationContext.Provider>
  );
}
