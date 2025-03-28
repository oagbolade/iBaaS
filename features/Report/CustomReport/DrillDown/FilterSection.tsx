import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Box, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from './style';
import { FormSelectInput, TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IBranches } from '@/api/ResponseTypes/general';
import { IEnquiryParams } from '@/api/reports/useGetAccountEnquiryBybranchId';

type Props = {
  branches?: IBranches[];
  onSearch: (params: IEnquiryParams | null) => void;
  reportType: string;
  setReportType: Dispatch<SetStateAction<string>>;
};

export const RadioOption = [
  { value: 'mainGroup', label: 'GL Main Group' },
  { value: 'subGrop', label: 'GL Sub Group' }
];

export const FilterSection = ({
  branches,
  onSearch,
  reportType,
  setReportType
}: Props) => {
  const { setDirection } = useSetDirection();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const handleSearchClick = () => {
    const searchParams = {
      branchId: selectedBranch || undefined,
      search: searchTerm || undefined,
      reportType
    };

    onSearch(searchParams);
  };

  return (
    <Box>
      <Stack gap={3} direction={setDirection()} ml={{ mobile: 4, tablet: 0 }}>
        <Box>
          <RadioButtons
            options={RadioOption}
            title="Select Report Type"
            value={reportType}
            name="reportType"
            handleCheck={(event: any, value: any) => setReportType(value)}
          />
        </Box>

        <Grid
          mb={{ tablet: 3 }}
          item
          mobile={12}
          tablet={5}
          justifyContent="center"
        >
          <FormSelectInput
            customStyle={{
              fontSize: '14px',
              ...inputFields,
              width: '200px'
            }}
            name="branchID"
            options={mappedBranches}
            label="Branch ID"
            value={selectedBranch}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedBranch(e.target.value)
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
              fontSize: '14px',
              ...inputFields,
              width: '300px'
            }}
            icon={<SearchIcon />}
            name="search"
            value={searchTerm}
            placeholder="Search by GL Node Name or code"
            label="Customer ID"
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
            customStyle={{
              backgroundColor: `${colors.activeBlue400}`,
              border: `1px solid ${colors.activeBlue400}`,
              color: `${colors.white}`
            }}
            buttonTitle="Search"
          />
        </Grid>
      </Stack>
    </Box>
  );
};
