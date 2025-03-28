'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TableSingleAction } from '@/components/Table';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import {
  IGlMainParams,
  useGetGlMainGroupReport
} from '@/api/reports/useGetGlMainGroupReport';
import { useGetGlSubGroupReport } from '@/api/reports/useGetSubGroupResponse';
import { useGetBranches } from '@/api/general/useBranches';
import { drillDownReportGlColumns } from '@/constants/Reports/COLUMNS';
import { FormSkeleton } from '@/components/Loaders';

export const DrillDown = () => {
  const [page, setPage] = useState<number>(1);
  const { branches } = useGetBranches();
  const [searchParams, setSearchParams] = useState<IGlMainParams | null>(null);
  const [reportType, setReportType] = useState<string>('mainGroup');

  const { branchId, search } = searchParams || {};

  const pageSize = 10;

  const { glMainGroupRptList = [], isLoading: isLoadingGlMainGroupList } =
    useGetGlMainGroupReport({
      pageSize,
      pageNumber: page
    });

  const { glSubGroupRptList = [], isLoading: isLoadingSubGroupList } =
    useGetGlSubGroupReport({
      nodeCode: 1, // example nodeCode, adjust based on use case
      pageSize,
      pageNumber: page
    });

  const handleSearch = (params: IGlMainParams | null) => {
    setSearchParams(params);
    setPage(1); // Reset to the first page on new search
  };

  const isLoading = isLoadingGlMainGroupList || isLoadingSubGroupList;

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const renderTableContent = () => {
    if (reportType === 'mainGroup') {
      return (
        <TableV2
          columns={drillDownReportGlColumns}
          data={glMainGroupRptList}
          showHeader={{
            mainTitle: 'Drill Down GL',
            secondaryTitle:
              'See a directory of all Drill Down GL Report in this system.'
          }}
          keys={['gl_NodeName', 'gL_NodeCode', 'total']}
          hideFilterSection
          tableConfig={{
            hasActions: false
          }}
        />
      );
    }

    return (
      <TableV2
        columns={drillDownReportGlColumns}
        data={glSubGroupRptList}
        showHeader={{
          mainTitle: 'Drill Down GL',
          secondaryTitle:
            'See a directory of all Drill Down GL Report in this system.'
        }}
        keys={['gL_ClassName', 'gL_ClassCode', 'total']}
        hideFilterSection
        tableConfig={{
          hasActions: false
        }}
      />
    );
  };

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection
          reportType={reportType}
          setReportType={setReportType}
          branches={branches}
          onSearch={handleSearch}
        />
      </Box>
      <Box sx={{ padding: '20px', width: '100%' }}>{renderTableContent()}</Box>
    </Box>
  );
};
