'use client';
import dynamic from 'next/dynamic';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';

const AddProduct = dynamic(
  () =>
    import('@/features/Setup/ProductAndGL/AddNewProduct').then(
      (mod) => mod.AddProduct
    ),
  {
    ssr: false
  }
);

export default function AddProductPage() {
  const getParams = useGetParams('productcode') || '';
  return <AddProduct productId={encryptData(getParams) || ''} />;
}
