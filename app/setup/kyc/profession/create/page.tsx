'use client';
import { CreateProfession } from '@/features/Setup';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateProfessionPage() {
  const getParams = useGetParams('id') || '';

  return <CreateProfession professionId={getParams} />;
}
