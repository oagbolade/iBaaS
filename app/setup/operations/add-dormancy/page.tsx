'use client';
import { CreateDormancy } from '@/features/Setup/Operations/AddDormancy';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function BankPage() {
  const getParams = useGetParams('id') || '';
  return <CreateDormancy dormancyId={encryptData(getParams) || ''} />;
}
