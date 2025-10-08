'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

const AddCasaProduct = dynamic(
  () =>
    import('@/features/Setup/ProductAndGL/AddCasaProduct').then(
      (mod) => mod.AddCasaProduct
    ),
  {
    ssr: false
  }
);

export default function AddProductPage() {
  const getParams = useGetParams('productcode') || '';
  return <AddCasaProduct productCasaId={encryptData(getParams) || ''} />;
}
