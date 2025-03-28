'use client';
import { CreateGroup } from '@/features/Setup';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function CreateGroupPage() {
  const getParams = useGetParams('id') || '';
  return <CreateGroup groupId={encryptData(getParams)} />;
}
