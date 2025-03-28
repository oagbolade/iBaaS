'use client';
import { CreateClearingBanks } from '@/features/Setup/Operations/AddClearingBanks';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function ClearingBanksPage() {
  const getParams = useGetParams('id') || '';

  return <CreateClearingBanks clearingBankId={getParams} />;
}
