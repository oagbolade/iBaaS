import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  detailsDescription,
  shortTitle,
} from '@/components/CustomCardsReports/style';
import { PageTitle } from '@/components/Typography';
import {
  CheckboxInput,
  FormSelectInput,
  TextInput,
} from '@/components/FormikFields';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { useCurrentBreakpoint } from '@/utils';
import { Role } from '@/constants/Administrator/selectOptions';
import { SearchIcon } from '@/assets/svg';

type Props = {
    title: string;
}

export const PrivilegeSection = ({title}: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  const Divider: React.FC = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          top: '20',
          width: '100%',
          margin: '20px auto',
          borderBottom: '1px solid var(--colour-neutral-neutral-300, #E1E6ED)',
        }}
      />
    );
  };

  return (
    <Box my={2}>
      <Divider />
      <PageTitle title={title} styles={shortTitle} />
      <Typography sx={detailsDescription}>
        Please select all that applies
      </Typography>
      <Grid mb={3} container>
        <Grid tablet={6}>
          <CheckboxInput label="Select all Permissions" />
        </Grid>

        <Grid tablet={6}>
          <FormSelectInput
            customStyle={{
              width: setWidth(),
              fontSize: '14px',
              ...inputFields,
            }}
            name="role"
            options={Role.roles}
            label="Copy Permission from"
            placeholder="Role"
          />{' '}
        </Grid>
      </Grid>
      <Box>
        <TextInput
          customStyle={{
            width: setWidth(),
            fontSize: '14px',
            ...inputFields,
          }}
          icon={<SearchIcon />}
          name="search"
          placeholder="Search"
        />{' '}
      </Box>
      <Grid container>
        <Grid
          tablet={4}
          sx={{
            width: '20%',
          }}
        >
          <CheckboxInput label="Setup BHIS" />
          <CheckboxInput label="SMS Android Report" />
          <CheckboxInput label="Cash Withdrawal" />
          <CheckboxInput label="Clearing" />
          <CheckboxInput label="Commercial Banks" />
        </Grid>
        <Grid
          tablet={4}
          sx={{
            width: '20%',
            padding: { mobile: '10px 17px', desktop: '20px 32px' },
          }}
        >
          <CheckboxInput label="Setup BHIS" />
          <CheckboxInput label="SMS Android Report" />
          <CheckboxInput label="Cash Withdrawal" />
          <CheckboxInput label="Clearing" />
          <CheckboxInput label="Commercial Banks" />
        </Grid>
        <Grid
          tablet={4}
          sx={{
            width: '20%',
            padding: { mobile: '10px 17px', desktop: '20px 32px' },
          }}
        >
          <CheckboxInput label="Setup BHIS" />
          <CheckboxInput label="SMS Android Report" />
          <CheckboxInput label="Cash Withdrawal" />
          <CheckboxInput label="Clearing" />
          <CheckboxInput label="Commercial Banks" />
        </Grid>
      </Grid>
    </Box>
  );
};
