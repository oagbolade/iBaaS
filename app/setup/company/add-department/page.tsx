'use client';
import { CreateDepartment } from '@/features/Setup/Company/AddDepartment';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function DepartmentPage() {
  const getParams = useGetParams('id') || '';
  return <CreateDepartment departmentId={encryptData(getParams)} />;
}
