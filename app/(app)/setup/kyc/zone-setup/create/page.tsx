'use client';
import { CreateZoneSetup } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateZoneSetupPage() {
  const getParams = useGetParams('id') || '';

  return <CreateZoneSetup zoneId={encryptData(getParams) as string} />;
}
