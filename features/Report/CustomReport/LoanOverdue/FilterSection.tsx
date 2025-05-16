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
          borderBottom: '1px solid #E8E8E8',
          marginTop: '10px',
          paddingX: '24px'
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
      <Box sx={{ height: '120px' }}>
        <Grid
          sx={{ padding: '15px 30px', display: 'flex', gap: '35px' }}
          spacing={2}
        >
          <Grid
            mb={{ tablet: 3 }}
            item
            mobile={12}
            tablet={5}
            sx={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <FormSelectInput
              customStyle={{
                width: '300px',
                fontSize: '14px',
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
            />{' '}
            <FormSelectInput
              customStyle={{
                width: '300px',
                fontSize: '14px',
                ...inputFields
              }}
              name="Product"
              options={mappedBankproducts}
              label="Product"
              value={selectedProduct}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSelectedproduct(e.target.value)
              }
            />{' '}
          </Grid>
          <Grid
            mb={{ tablet: 6 }}
            item
            mobile={12}
            tablet={6}
            justifyContent="center"
          >
            <TextInput
              customStyle={{
                width: '300px',
                fontSize: '14px',
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
            tablet={1}
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
  );
};
