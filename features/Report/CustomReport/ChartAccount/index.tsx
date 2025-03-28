'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMN';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { useGetChartOfAccount } from '@/api/reports/useChartAccount';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { IChartOfAccount } from '@/api/ResponseTypes/reports';
import { useGetBranches } from '@/api/general/useBranches';

import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

export const ChartAccount = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();

  const [dateValue, setDateValue] = React.useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs()
  ]);

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );
  const { isDateFilterApplied } = React.useContext(DateRangePickerContext);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams(params);
  };

  const {
    chartofAccountList: getAllChartOfAccountData,
    isLoading: isChartOfAccountLoading
  } = useGetChartOfAccount({
    ...searchParams,
    page
  });

  React.useEffect(() => {
    if (
      Array.isArray(getAllChartOfAccountData) &&
      getAllChartOfAccountData.length > 0
    ) {
      const mapChartOfAccount = getAllChartOfAccountData.map((item) => ({
        glnumber: item.glnumber,
        acctname: item.acctname
      }));

      setExportData(mapChartOfAccount as []);
      setReportType('ChartOfAccount');
    }
  }, [getAllChartOfAccountData, setExportData, setReportType]);

  const DateRangePicker = () => {
    return (
      <DateRangeCalendar
        value={dateValue}
        onChange={(newValue) => {
          if (newValue[1] !== null) {
            setDateValue(newValue);
          }
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <Box sx={{ width: '100%' }}>
        <TopOverViewSection
          useBackButton
          CustomDateRangePicker={<DateRangePicker />}
        />
      </Box>{' '}
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isChartOfAccountLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <MuiTableContainer
              columns={COLUMN}
              tableConfig={{
                hasActions: true
              }}
              showHeader={{
                hideFilterSection: true,
                mainTitle: 'Chart Of Account ',
                secondaryTitle:
                  'See a directory of all Chart of Account in this system.'
              }}
              data={getAllChartOfAccountData}
              setPage={setPage}
              page={page}
            >
              {search ? (
                getAllChartOfAccountData?.map((dataItem: IChartOfAccount) => {
                  return (
                    <StyledTableRow key={dataItem.glnumber}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem?.glnumber || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        {dataItem?.acctname || 'N/A'}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMN.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(getAllChartOfAccountData || null)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};
