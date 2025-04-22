'use client';
import dynamic from 'next/dynamic';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

const CreateChequeBook = dynamic(
  () =>
    import('@/features/Setup/Operations/AddChequeBook').then(
      (mod) => mod.CreateChequeBook
    ),
  {
    ssr: false
  }
);

export default function ChequePage() {
  const getParams = useGetParams('id') || '';

  return <CreateChequeBook chequeId={encryptData(getParams) || ''} />;
}
