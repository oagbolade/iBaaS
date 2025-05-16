'use client';
import { AddCondition } from '@/features/Setup/ProductAndGL/ConditionPrecedent';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddConditionPrecedentPage() {
  const getParams = useGetParams('id') || '';

  return <AddCondition conditionId={encryptData(getParams)} />;
}
