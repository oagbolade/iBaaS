'use client';
import { CreateHoliday } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateHolidayPage() {
  const getParams = useGetParams('id') || '';

  return <CreateHoliday holidayId={encryptData(getParams)} />;
}
