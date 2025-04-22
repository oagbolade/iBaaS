'use client';
import { AddGlClass } from '@/features/Setup/ProductAndGL/AddGLClass';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddGLClassPage() {
  const getParams = useGetParams('id') || '';
  return <AddGlClass classId={encryptData(getParams) || ''} />;
}
