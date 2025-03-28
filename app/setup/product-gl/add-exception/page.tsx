'use client';
import { AddException } from '@/features/Setup/ProductAndGL/AddExeption';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddExceptionPage() {
  const getParams = useGetParams('id') || '';
  return <AddException exceptionId={encryptData(getParams)} />;
}
