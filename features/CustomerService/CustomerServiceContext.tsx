'use client';
import { createContext, useState } from 'react';

const initialSetupContext = {
  isSetupModalOpen: false,
  isEditingSetup: false,
  toggleSetupModal: (isEditingSetup: boolean) => {},
};

export const CustomerServiceContext =
  createContext<CustomerServiceContextType>(initialSetupContext);

type CustomerServiceContextType = typeof initialSetupContext;

export default function CustomerServiceContextProvider({ children }: any) {
  const [isSetupModalOpen, setOpen] = useState(false);
  const [isEditingSetup, setIsEditing] = useState(false);

  const toggleSetupModal = (isEditingSetup: boolean) => {
    setIsEditing(isEditingSetup);
    setOpen(!isSetupModalOpen);
  };

  const value: CustomerServiceContextType = {
    isSetupModalOpen,
    toggleSetupModal,
    isEditingSetup,
  };

  return (
    <CustomerServiceContext.Provider value={value}>
      {children}
    </CustomerServiceContext.Provider>
  );
}
