'use client';
import dynamic from 'next/dynamic';

const CreateAccountContainer = dynamic(
  () =>
    import('@/features/CustomerService/Customer/CreateAccount').then(
      (mod) => mod.CreateAccountContainer
    ),
  {
    ssr: false
  }
);

export default function CreateAccountPage() {
  return <CreateAccountContainer />;
}
