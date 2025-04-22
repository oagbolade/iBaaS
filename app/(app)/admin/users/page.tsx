'use client';
import dynamic from 'next/dynamic';

const Users = dynamic(
  () => import('@/features/Administrator').then((mod) => mod.Users),
  {
    ssr: false
  }
);

export default function UsersPage() {
  return <Users />;
}
