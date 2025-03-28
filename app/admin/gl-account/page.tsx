import { GLAccount } from '@/features/Administrator';

export async function generateMetadata() {
  return {
    title: 'GL Account'
  };
}

export default function GLAccountPage() {
  return <GLAccount />;
}
