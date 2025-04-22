'use client';
import dynamic from 'next/dynamic';
import { useGetParams } from '@/utils/hooks/useGetParams';

const ResetUser = dynamic(
  () => import('@/features/Administrator').then((mod) => mod.ResetUser),
  {
    ssr: false
  }
);

export default function ResetUserDetailsPage() {
  const userid = useGetParams('userid') || '';
  const fullname = useGetParams('fullname') || '';
  const roleId = useGetParams('roleId') || '';

  return <ResetUser userid={userid} fullname={fullname} roleId={roleId} />;
}
