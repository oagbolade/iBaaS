'use client';
import { CreateEducation } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateEducationPage() {
  const getParams = useGetParams('id') || '';

  return <CreateEducation educationId={encryptData(getParams) as string} />;
}
