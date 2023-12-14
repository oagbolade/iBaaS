'use client';
import React from 'react';
import { Box } from '@mui/material';
import { useBusinessSetup } from '@/utils/useBusinessSetup';
import { useRemoveSideBar } from '@/utils/useRemoveSidebar';

type Props = {
  children: React.ReactNode;
};
export const RenderChildren = ({ children }: Props) => {
  const { isBusinessSetupPage } = useBusinessSetup();
  const { marginLeft, width } = useRemoveSideBar();

  return isBusinessSetupPage ? (
    children
  ) : (
    <Box sx={{ marginLeft, width }}>{children}</Box>
  );
};
