'use client';
import { UpdateState } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function StateManagementPage() {
  const getParams = useGetParams('id') || '';

  return <UpdateState stateId={encryptData(getParams) || ''} />;
}
