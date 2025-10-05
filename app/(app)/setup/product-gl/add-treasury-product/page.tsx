'use client';
import React from 'react';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { AddTreasuryProduct } from '@/features/Setup/ProductAndGL/AddTreasuryProduct';

export default function AddProductPage() {
  const getParams = useGetParams('productcode') || '';
  return <AddTreasuryProduct productCasaId={encryptData(getParams) || ''} />;
}
