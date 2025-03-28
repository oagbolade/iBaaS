'use client';
import { AddCasaProduct } from '@/features/Setup/ProductAndGL/AddCasaProduct';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddProductPage() {
  const getParams = useGetParams('productcode') || '';
  return <AddCasaProduct productCasaId={getParams} />;
}
