'use client';
import { CreateChequeBook } from '@/features/Setup/Operations/AddChequeBook';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function ChequePage() {
  const getParams = useGetParams('id') || '';

  return <CreateChequeBook chequeId={encryptData(getParams) || ''} />;
}
