'use client';
import React from 'react';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { AddCasaProduct } from '@/features/Setup/ProductAndGL/AddCasaProduct';

export default function AddProductPage() {
  const getParams = useGetParams('productcode') || '';
  return <AddCasaProduct productCasaId={encryptData(getParams) || ''} />;
}
