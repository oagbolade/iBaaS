'use client';
import { ResetUser } from '@/features/Administrator';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function ResetUserDetailsPage() {
  const userid = useGetParams('userid') || '';
  const fullname = useGetParams('fullname') || '';
  const roleId = useGetParams('roleId') || '';

  return <ResetUser userid={userid} fullname={fullname} roleId={roleId} />;
}
