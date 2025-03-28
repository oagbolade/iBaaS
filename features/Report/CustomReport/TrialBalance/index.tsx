'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { ShortCards } from '@/components/CustomCardsReports/ShortCards';

import {
  totalContainer,
  totalTitle
} from '@/components/CustomCardsReports/style';
import { PageTitle } from '@/components/Typography';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useGetTrialBalance } from '@/api/reports/useTrialBalance';

export const TrialBalance = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams(params);
  };

  const {
    trialBydateList: getAllTrialBalanceData,
    isLoading: isTrialBalanceDataLoading
  } = useGetTrialBalance({
    ...searchParams,
    page
  });

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}

      <Box>
        {isTrialBalanceDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box>
            {search ? (
              <Box>
                <Box>
                  <Box>
                    <ShortCards
                      title="Main Cash"
                      numberOfAccounts="₦ 0.00 Balance"
                      link="/report/custom-report/trial-balance/main-cash"
                    />
                  </Box>
                  <Box>
                    <ShortCards
                      link="/report/custom-report/trial-balance/commercial-banks"
                      title="Balances Held with Commercial Banks"
                      numberOfAccounts="₦ 0.00 Balance"
                    />
                  </Box>
                  <Box>
                    <ShortCards
                      title="Overdraft Facilities Current Account"
                      numberOfAccounts="₦ 0.00 Balance"
                      link="/report/custom-report/trial-balance/overdraft-current-account"
                    />
                  </Box>
                  <Box>
                    <ShortCards
                      title="Overdraft Facilities Saving Account"
                      numberOfAccounts="₦ 0.00 Balance"
                      link="/report/custom-report/trial-balance/overdraft-savings-account"
                    />
                  </Box>
                  <Box sx={totalContainer}>
                    <PageTitle title="Total Asset" styles={{ ...totalTitle }} />
                    <Box sx={{ paddingLeft: '74%' }}>
                      <PageTitle title="₦ 0.00" styles={{ ...totalTitle }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box>
                  <ShortCards
                    title="Main Cash"
                    numberOfAccounts="₦ 0.00 Balance"
                    link="/report/custom-report/trial-balance/main-cash"
                  />
                </Box>
                <Box>
                  <ShortCards
                    link="/report/custom-report/trial-balance/commercial-banks"
                    title="Balances Held with Commercial Banks"
                    numberOfAccounts="₦ 0.00 Balance"
                  />
                </Box>
                <Box>
                  <ShortCards
                    title="Overdraft Facilities Current Account"
                    numberOfAccounts="₦ 0.00 Balance"
                    link="/report/custom-report/trial-balance/overdraft-current-account"
                  />
                </Box>
                <Box>
                  <ShortCards
                    title="Overdraft Facilities Saving Account"
                    numberOfAccounts="₦ 0.00 Balance"
                    link="/report/custom-report/trial-balance/overdraft-savings-account"
                  />
                </Box>
                <Box sx={totalContainer}>
                  <PageTitle title="Total Asset" styles={{ ...totalTitle }} />
                  <Box sx={{ paddingLeft: '74%' }}>
                    <PageTitle title="₦ 0.00" styles={{ ...totalTitle }} />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
