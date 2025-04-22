'use client';
import dynamic from 'next/dynamic';
import { useGetParams } from '@/utils/hooks/useGetParams';

const CreateUser = dynamic(
  () =>
    import('@/features/Administrator/CreateUser').then((mod) => mod.CreateUser),
  {
    ssr: false
  }
);
export default function UsersPage() {
  const userid = useGetParams('userid') || '';

  return <CreateUser userid={userid} />;
}
