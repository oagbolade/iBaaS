'use client';
import { CreateRelationship } from '@/features/Setup';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateRelationshipPage() {
  const getParams = useGetParams('id') || '';

  return <CreateRelationship relationshipId={getParams} />;
}
