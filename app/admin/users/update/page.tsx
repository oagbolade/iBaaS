'use client';
import { CreateUser } from '@/features/Administrator';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function UpdateAccountOfficer() {
  const userid = useGetParams('userid') || '';

  return <CreateUser userid={userid} />;
}
