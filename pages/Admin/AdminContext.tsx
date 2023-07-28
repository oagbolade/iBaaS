'use client';
import { createContext, useState } from 'react';

const initialAdminContext = {
  open: false,
  toggleModal: () => {},
};

export const AdminContext = createContext<AdminContextType>(initialAdminContext);

type AdminContextType = typeof initialAdminContext;

export function AdminContextProvider({ children }: any) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);

  const value: AdminContextType = {
    open,
    toggleModal,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
