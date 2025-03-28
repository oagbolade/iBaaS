'use client';
import { CreateDocument } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function DocumentPage() {
  const getParams = useGetParams('id') || '';

  return <CreateDocument documentId={encryptData(getParams) as string} />;
}
