'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { AddCasaProduct } from '@/features/Setup/ProductAndGL/AddCasaProduct';
import { AddTreasuryProduct } from '@/features/Setup/ProductAndGL/AddTreasuryProduct';

export default function AddProductPage() {
  const getParams = useGetParams('productcode') || '';
  return <AddTreasuryProduct productCasaId={encryptData(getParams) || ''} />;
}
