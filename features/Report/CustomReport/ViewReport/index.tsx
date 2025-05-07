'use client';
import React, { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { ViewReports } from '@/components/ViewReport/ViewReports';
import { ViewMaturityLoan } from '@/components/ViewReport/ViewMaturityLoan';
import { ViewPostingJournal } from '@/components/ViewReport/ViewPotingJournal';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { getPostingJournal } from '@/api/reports/usePostingJournal';

export const ViewAccountEnquiry = () => {
  const searchParams = useSearchParams();
  const [actionType, setActionType] = React.useState<string>('default');
  useEffect(() => {
    const actionMap = {
      getMaturityLoan: 'maturityLoan',
      getPostingJournal: 'postingJournal',
    };
  
    const actionKey = Object.keys(actionMap).find(key => searchParams.get(key));
    setActionType(actionKey ? actionMap[actionKey as keyof typeof actionMap] : 'default');
  }, [searchParams]);

  const showReportTable = searchParams.get('showTableReport');
  const getLoandetailReport = searchParams.get('loanDetail');
  const getPostingJournalDetail = searchParams.get('postingJournalDetail');

  const renderContent = () => {
    switch (actionType) {
      case 'maturityLoan':
        return (
          <Box>
            <ViewMaturityLoan detail={JSON.parse(getLoandetailReport || '{}')} />
          </Box>
        );
      case 'postingJournal':
        return (
          <Box>
            <ViewPostingJournal detail={JSON.parse(getPostingJournalDetail || '{}')} /> 
          </Box>
        );
      default:
        return (
          <Box>
            <Box sx={{ width: '100%', marginTop: '50px' }}>
              <TopOverViewSection useBackButton />
            </Box>
            <Stack direction="row">
              <ViewReports />
            </Stack>
            {showReportTable && (
              <Box sx={{ padding: '25px', width: '100%' }}>
                <MuiTableContainer
                  tableConfig={{ hasActions: false }}
                  columns={MOCK_COLUMNS}
                  data={MOCK_DATA}
                  showSearch
                />
              </Box>
            )}
          </Box>
        );
    }
  };

  return renderContent();
}
