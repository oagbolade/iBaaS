import React, { ChangeEvent, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { dateFilter, exportData, inputFields } from '../style';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import {
  FormSelectField,
  FormSelectInput,
  TextInput
} from '@/components/FormikFields';
import {
  ActionButton,
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { LoanOverdueParams } from '@/api/reports/useGetLoanOverdueReport';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ExportIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import useFormattedDates from '@/utils/hooks/useFormattedDates';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  branches?: IBranches[];
  onSearch: (params: LoanOverdueParams | null) => void;
  bankproducts: IBankProducts[] | Array<any>;
};

export const FilterSection = ({ branches, onSearch, bankproducts }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedProduct, setSelectedproduct] = useState('');
  const { setDirection } = useSetDirection();
  const { currentDate } = useFormattedDates();
  const [reportDate, setReportDate] = React.useState<Dayjs>(dayjs(currentDate));
  const { setWidth } = useCurrentBreakpoint();

  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts
  });

  const handleSearchClick = () => {
    const searchParams = {
      branch: selectedBranch || null,
      search: searchTerm || null,
      product: selectedProduct || null,
      reportDate: reportDate.format('YYYY-MM-DD')
    };

    onSearch(searchParams);
  };

  return (
    <Box>
      <Stack
        sx={{
          position: 'sticky',
          top: '60px',
          zIndex: 3,
          backgroundColor: `${colors.white}`,
          borderLeft: `1px solid ${colors.loanTitleColor}`,
          borderBottom: `1px solid ${colors.loanTitleColor}`,
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
        direction={setDirection()}
        justifyContent="space-between"
      >
        <Box>
          <Box mt={2.3}>
            <BackButton />
          </Box>
        </Box>
        <Stack
          mt={1}
          direction={setDirection()}
          spacing={2}
          justifyContent="space-between"
        >
          <Box>
            <ActionButtonWithPopper
              searchGroupVariant="ExportReport"
              customStyle={{ ...exportData }}
              icon={<ExportIcon />}
              iconPosition="start"
              buttonTitle="Export Data"
            />
          </Box>

          <Box>
            <ActionButtonWithPopper
              searchGroupVariant="DateRangePicker"
              CustomDateRangePicker={
                <DateCalendar
                  value={reportDate}
                  onChange={(date) => setReportDate(date)}
                />
              }
              customStyle={{ ...dateFilter }}
              icon={
                <CalendarTodayOutlinedIcon
                  sx={{
                    color: `${colors.Heading}`
                  }}
                />
              }
              iconPosition="end"
              buttonTitle={reportDate.format('YYYY-MM-DD')}
            />
          </Box>
        </Stack>
      </Stack>

      <Box
        sx={{
          marginTop: '30px',
          paddingX: '24px'
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid item mobile={12} tablet={3}>
              <FormSelectInput
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                name="branchID"
                options={mappedBranches}
                label="Branch Name"
                required
                value={selectedBranch}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSelectedBranch(e.target.value)
                }
              />
            </Grid>

            <Grid item mobile={12} tablet={3}>
              <FormSelectInput
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                name="Product"
                options={mappedBankproducts}
                label="Product"
                value={selectedProduct}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSelectedproduct(e.target.value)
                }
              />
            </Grid>

            <Grid item mobile={12} tablet={4}>
              <TextInput
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="search"
                value={searchTerm}
                placeholder="Search for Account Number"
                label="Search for Account Number"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />{' '}
            </Grid>

            <Grid
              item
              mobile={12}
              tablet={2}
              sx={{ display: 'flex' }}
              justifyContent="flex-end"
              mt={{ tablet: 3.2 }}
              mr={{ mobile: 30, tablet: 0 }}
              mb={{ mobile: 6, tablet: 0 }}
            >
              <ActionButton
                onClick={handleSearchClick}
                customStyle={buttonBackgroundColor}
                buttonTitle="Search"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
