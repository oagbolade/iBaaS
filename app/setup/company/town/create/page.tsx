'use client';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { CreateTown } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';

export default function CreateTownPage() {
  const getParams = useGetParams('id') || '';

  return <CreateTown townId={encryptData(getParams)} />;
}
