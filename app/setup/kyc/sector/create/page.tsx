'use client';
import { CreateSector } from '@/features/Setup';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function SectorPage() {
  const getParams = useGetParams('id') || '';

  return <CreateSector sectorId={getParams} />;
}
