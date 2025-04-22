'use client';
import dynamic from 'next/dynamic';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

const CreateDormancy = dynamic(
  () =>
    import('@/features/Setup/Operations/AddDormancy').then(
      (mod) => mod.CreateDormancy
    ),
  {
    ssr: false
  }
);

export default function BankPage() {
  const getParams = useGetParams('id') || '';
  return <CreateDormancy dormancyId={encryptData(getParams) || ''} />;
}
