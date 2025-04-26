'use client';
import React, { useState } from 'react';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import Link from 'next/link';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';
import { useGetAllDormantAccount } from '@/api/reports/useDormantAccount';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
// import { FilterSection } from '../ChequeBook/FilterSection';

export const DormantAccount = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { dormantAccountList = [], isLoading } = useGetAllDormantAccount({
    pageNumber,
    pageSize,
  });

  const { branches } = useGetBranches();

  console.log('dormantAccountList', dormantAccountList);
  console.log('branches', branches);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    // setReportType('ChequeBookStatus');
    setSearchParams({
      ...params,
      // startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      // endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });

    // setReportType('ChequeBookStatus');
  };

  const ActionMenu: React.FC = () => {
    return (
      <Link href="/report/custom-report/view-report">
        <TableSingleAction actionName="View" />
      </Link>
    );
  };
  return (
    // <Box sx={{ width: '100%' }}>
       <Box sx={{ marginTop: '50px', width: '100%' }}>

      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection />
              {/* <FilterSection
                  branches={branches}
                  onSearch={handleSearch}
                  status={status}
                /> */}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Dormant Account',
            secondaryTitle:
              'See a directory of all account enquiry on this system.',
            hideFilterSection: true,
          }}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
