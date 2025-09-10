'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { TableV2 } from '@/components/Revamp/TableV2';

import { useGetGlMainGroupReport } from '@/api/reports/useGetSubGroupResponse';
import {
  drillDownReportGlColumns,
  drilMainKey
} from '@/constants/Reports/COLUMNS';
import { FormSkeleton } from '@/components/Loaders';
import { ISearchParams } from '@/app/api/search/route';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import colors from '@/assets/colors';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

interface ActionMenuProps {
  detail: string;
}
const ActionMenu = ({ detail }: ActionMenuProps) => {
  return (
    <Link
      href={`/report/custom-report/view-report-drillgl/?stepOne=mainGroup&detail=${detail}`}
      style={{ color: `${colors.activeBlue400}` }}
    >
      View Breakdown
    </Link>
  );
};

export const DrillDown = () => {
  const { setReportType, setExportData, readyDownload, setReadyDownload } =
    React.useContext(DownloadReportContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('drill-down');

  const { isLoading, glMainGroupRptList, totalRecords } =
    useGetGlMainGroupReport({
      ...searchParams,
      pageNumber: String(page)
    });

  const handleSearch = (params: ISearchParams | null) => {
    setSearchActive(true);
    setReadyDownload(false);
    setSearchParams(params);
    setReportType('GLMainGroupReport');
  };

  React.useEffect(() => {
    setReportType('GLMainGroupReport');
    if (readyDownload && glMainGroupRptList?.pagedMainGroupReports.length > 0) {
      const reportData = glMainGroupRptList?.pagedMainGroupReports.map(
        (item) => ({
          GlName: item.gl_NodeName,
          GlCode: item.gL_NodeCode,
          total: item.total
        })
      );
      setExportData(reportData as []);
    }
  }, [
    isLoading,
    readyDownload,
    setExportData,
    glMainGroupRptList,
    setReportType
  ]);

  return (
    <Box sx={{ width: '100%' }}>
      <TopOverViewSection useBackButton showDatePicker={false} />

      <FilterSection onSearch={handleSearch} />

      <Box sx={{ paddingX: '24px' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <TableV2
            isSearched={searchActive}
            columns={drillDownReportGlColumns}
            data={glMainGroupRptList?.pagedMainGroupReports}
            showHeader={{
              mainTitle: 'Drill Down GL',
              secondaryTitle:
                'See a directory of all Drill Down GL Report in this system.'
            }}
            keys={drilMainKey as []}
            hideFilterSection
            tableConfig={{
              hasActions: true,
              grandTotalRow: [
                'Grand Total',
                '',
                `NGN ${formatCurrency(glMainGroupRptList?.total || 0)}`,
                ''
              ]
            }}
            setPage={setPage}
            totalPages={Math.ceil(totalRecords / 10)}
            page={page}
            ActionMenuProps={(dataItem: any) => (
              <ActionMenu detail={JSON.stringify(dataItem)} />
            )}
          />
        )}
      </Box>
    </Box>
  );
};
