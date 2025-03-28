'use client';
import { AddProduct } from '@/features/Setup/ProductAndGL/AddNewProduct';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddProductPage() {
  const getParams = useGetParams('id') || '';
  return <AddProduct productId={getParams} />;
}
