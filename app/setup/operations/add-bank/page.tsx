'use client';
import { AddBank } from '@/features/Setup/Operations/AddBank';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function BankPage() {
  const getParams = useGetParams('id') || '';

  return <AddBank bankId={getParams} />;
}
