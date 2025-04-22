'use client';
import dynamic from 'next/dynamic';

const ChangePassword = dynamic(
  () => import('@/features/Administrator').then((mod) => mod.ChangePassword),
  {
    ssr: false
  }
);

export default function ChangePasswordPage() {
  return <ChangePassword />;
}
