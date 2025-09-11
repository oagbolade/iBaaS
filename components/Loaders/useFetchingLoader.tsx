// components/FetchingLoader.tsx
'use client';
import React from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { FormSkeleton } from '@/components/Loaders';

export const FetchingLoader = ({ noOfLoaders = 3 }) => {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return <FormSkeleton noOfLoaders={noOfLoaders} />;
};
