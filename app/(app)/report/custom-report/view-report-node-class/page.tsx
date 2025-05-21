'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ViewMainGLReport } from '@/components/ViewReport/ViewMainGLReport';

export default function ViewReportDrillGl() {
  const searchParams = useSearchParams();

  const getGLMainDetail = JSON.parse(searchParams.get('detail') ?? '{}');

  return <ViewMainGLReport detail={getGLMainDetail?.data} />;
}
