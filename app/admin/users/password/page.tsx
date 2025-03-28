'use client';
import { ChangePassword } from '@/features/Administrator';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function ChangePasswordPage() {
  const userid = useGetParams('userid') || '';
  const fullname = useGetParams('fullname') || '';

  return <ChangePassword userid={userid} fullname={fullname} />;
}
