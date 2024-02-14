import { CreateRole } from '@/features/Administrator';

export async function generateMetadata() {
  return {
    title: 'Create Role',
  };
}

export default function CreateRolePage() {
  return <CreateRole />;
}
