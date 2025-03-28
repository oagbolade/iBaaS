'use client';
import { AddTransaction } from '@/features/Setup/Operations/AddTransaction';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function TransactionPage() {
  const getParams = useGetParams('id') || '';

  return <AddTransaction transactionId={getParams} />;
}
