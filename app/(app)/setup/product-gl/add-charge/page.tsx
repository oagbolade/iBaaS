'use client';
import { AddCharges } from '@/features/Setup/ProductAndGL/AddCharge';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export default function AddChargesPage() {
  const getParams = useGetParams('id') || '';

  return <AddCharges chargeId={encryptData(getParams)} />;
}
