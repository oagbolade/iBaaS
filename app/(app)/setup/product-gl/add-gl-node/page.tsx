'use client';
import { AddGlNode } from '@/features/Setup/ProductAndGL/AddGlNode';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddGLNodePage() {
  const getParams = useGetParams('id') || '';
  const getParam = useGetParams('node') || '';

  return <AddGlNode nodeId={getParams} prodCode={getParam} />;
}
