'use client';
import { createContext, useState } from 'react';

const initialAdminContext = {
  open: false,
  isEditing: false,
  toggleModal: (isEditing: boolean) => {},
};

export const AdminContext = createContext<AdminContextType>(initialAdminContext);

type AdminContextType = typeof initialAdminContext;

export function AdminContextProvider({ children }: any) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleModal = (isEditing: boolean) => {
    setIsEditing(isEditing);
    setOpen(!open)
  };

  const value: AdminContextType = {
    open,
    toggleModal,
    isEditing
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
