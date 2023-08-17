'use client';
import { createContext, useState } from 'react';

const initialSetupContext = {
  isSetupModalOpen: false,
  isEditingSetup: false,
  toggleSetupModal: (isEditingSetup: boolean) => {},
};

export const SetupContext =
  createContext<SetupContextType>(initialSetupContext);

type SetupContextType = typeof initialSetupContext;

export default function SetupContextProvider({ children }: any) {
  const [isSetupModalOpen, setOpen] = useState(false);
  const [isEditingSetup, setIsEditing] = useState(false);

  const toggleSetupModal = (isEditingSetup: boolean) => {
    setIsEditing(isEditingSetup);
    setOpen(!isSetupModalOpen);
  };

  const value: SetupContextType = {
    isSetupModalOpen,
    toggleSetupModal,
    isEditingSetup,
  };

  return (
    <SetupContext.Provider value={value}>{children}</SetupContext.Provider>
  );
}
