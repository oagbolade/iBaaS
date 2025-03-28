'use client';
import { CreateCountry } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateCountryPage() {
  const getParams = useGetParams('id') || '';

  return <CreateCountry countryId={encryptData(getParams)} />;
}
