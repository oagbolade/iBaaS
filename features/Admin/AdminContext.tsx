'use client';
import { createContext, useState, useMemo, useCallback } from 'react';

const initialAdminContext = {
  open: false,
  isEditing: false,
  // eslint-disable-next-line no-unused-vars
  toggleModal: (isEditing: boolean) => {},
};

type AdminContextType = typeof initialAdminContext;

export const AdminContext =
  createContext<AdminContextType>(initialAdminContext);

export default function AdminContextProvider({ children }: any) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleModal = useCallback(
    (isEditingModal: boolean) => {
      setIsEditing(isEditingModal);
      setOpen(!open);
    },
    [open],
  );

  const value: AdminContextType = useMemo(() => {
    return {
      open,
      toggleModal,
      isEditing,
    };
  }, [open, toggleModal, isEditing]);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
