'use client';
import { CreateIndustry } from '@/features/Setup';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateIndustryPage() {
  const getParams = useGetParams('id') || '';

  return <CreateIndustry industryId={getParams} />;
}
