'use client';
import { createContext, useState } from 'react';

const initialSetupContext = {
  isCustomerServiceModalOpen: false,
  isEditingCustomerService: false,
  toggleCustomerServiceModal: (isEditingCustomerService: boolean) => {},
};

export const CustomerServiceContext =
  createContext<CustomerServiceContextType>(initialSetupContext);

type CustomerServiceContextType = typeof initialSetupContext;

export default function CustomerServiceContextProvider({ children }: any) {
  const [isCustomerServiceModalOpen, setOpen] = useState(false);
  const [isEditingCustomerService, setIsEditing] = useState(false);

  const toggleCustomerServiceModal = (isEditingCustomerService: boolean) => {
    setIsEditing(isEditingCustomerService);
    setOpen(!isCustomerServiceModalOpen);
  };

  const value: CustomerServiceContextType = {
    isCustomerServiceModalOpen,
    toggleCustomerServiceModal,
    isEditingCustomerService,
  };

  return (
    <CustomerServiceContext.Provider value={value}>
      {children}
    </CustomerServiceContext.Provider>
  );
}
