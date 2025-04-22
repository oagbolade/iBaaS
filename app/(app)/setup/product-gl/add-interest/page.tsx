'use client';
import { AddInterest } from '@/features/Setup/ProductAndGL/AddInterest';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddInterestPage() {
  const getParams = useGetParams('id') || '';

  return <AddInterest interestId={getParams} />;
}
