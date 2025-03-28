'use client';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { CreateRegion } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';

export default function CreateRegionPage() {
  const getParams = useGetParams('id') || '';

  return <CreateRegion regionId={encryptData(getParams) || ''} />;
}
