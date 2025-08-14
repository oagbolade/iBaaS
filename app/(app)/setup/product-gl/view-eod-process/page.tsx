'use client';
import { EndOfDayProcessTable } from '@/features/Operation/endOfDay/ViewEOD';
import { AddException } from '@/features/Setup/ProductAndGL/AddExeption';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function EndOfDayProcessPage() {
  const getParams = useGetParams('id') || '';
  return <EndOfDayProcessTable EODid={getParams} />;
}
