'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ViewSubGLReport } from '@/components/ViewReport/ViewSubMainGLGroup';

export default function ViewReportDrillGl() {
  const searchParams = useSearchParams();

  function safeJSONParse(str: string | null) {
    try {
      return JSON.parse(str ?? '{}');
    } catch (e) {
      return {};
    }
  }

  // Usage
  const getGLMainDetail = safeJSONParse(searchParams.get('detail'));

  return <ViewSubGLReport detail={getGLMainDetail?.data} />;
}
