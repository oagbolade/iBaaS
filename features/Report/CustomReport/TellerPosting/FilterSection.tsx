import React, { ChangeEvent, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { buttonBackgroundColor } from '../AccountDebit/style';
import { dateFilter } from '../../AuditTrail/styles';
import { TextInput } from '@/components/FormikFields';
import {
  ActionButton,
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Report/CustomReport/style';
import { ITellerPostingParams } from '@/api/reports/useGetTellerPosting';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import useFormattedDates from '@/utils/hooks/useFormattedDates';
import { exportData } from '@/components/ViewReport/style';
import { ExportIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  onSearch: (params: ITellerPostingParams | null) => void;
};

export const FilterSection = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setDirection } = useSetDirection();

  const { dateValue, setDateValue } = React.useContext(DateRangePickerContext);
  const endDate = dateValue[1];

  const handleSearchClick = () => {
    const searchParams = {
      search: searchTerm || undefined,
      reportDate: endDate?.format('YYYY-MM-DD')
    };

    onSearch(searchParams);
  };

  return (
    <>
      <Stack
        sx={{
          borderBottom: `1px solid ${colors.loanTitleColor}`,
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
                  value={endDate}
                  onChange={(date) =>
                    setDateValue([dateValue[0], date], { allowSingle: true })
                  }
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
              buttonTitle={endDate?.format('YYYY-MM-DD')}
            />
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ height: '120px' }}>
        <Grid
          container
          sx={{ padding: '15px 30px', display: 'flex', gap: '35px' }}
          spacing={2}
        >
          <Grid
            mb={{ tablet: 10 }}
            item
            mobile={12}
            tablet={10}
            justifyContent="center"
          >
            <TextInput
              customStyle={{
                width: '100%',
                ...inputFields
              }}
              icon={<SearchIcon />}
              name="search"
              value={searchTerm}
              placeholder="Search a Teller or User ID"
              label="Teller/User ID"
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
    </>
  );
};
