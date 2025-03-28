'use client';
import { CreateBranch } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function BranchPage() {
  const getParams = useGetParams('id') || '';

  return <CreateBranch branchId={encryptData(getParams)} />;
}
