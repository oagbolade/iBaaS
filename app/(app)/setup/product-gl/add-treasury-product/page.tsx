'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

const AddTreasuryProduct = dynamic(
  () =>
    import('@/features/Setup/ProductAndGL/AddTreasuryProduct').then(
      (mod) => mod.AddTreasuryProduct
    ),
  {
    ssr: false
  }
);

export default function AddProductPage() {
  const getParams = useGetParams('productcode') || '';
  return <AddTreasuryProduct productCasaId={encryptData(getParams) || ''} />;
}
