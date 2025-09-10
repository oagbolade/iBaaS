import React from 'react';
import {
  Box,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  Grid,
  Stack
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import {
  applyFilterButton,
  checkboxSearchgroupContainer,
  menuTypography
} from '../styles';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { TextInput } from '@/components/FormikFields';
import { SearchIcon } from '@/assets/svg';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { TypographyButton } from '@/components/Revamp/Modal/style';

type Props = {
  options?: Array<string | React.ReactElement> | undefined;
  handleClose: any;
};

const CustomizedCheckbox = styled(FormControlLabel)(
  () => `
  .MuiFormControlLabel-label{
    text-transform: uppercase;
    font-size: 12px;
    width: 151px;
  }
`
);

export const CheckBoxSearchGroup = ({ handleClose, options }: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          ...checkboxSearchgroupContainer
        }}
      >
        <Grid mb={1.8} item mobile={12} tablet={12} justifyContent="center">
          <TextInput
            customStyle={{
              width: setWidth(),
              ...inputFields,
              fontSize: '12px',
              height: '28px'
            }}
            icon={<SearchIcon />}
            name="customerID"
            placeholder="Search"
          />{' '}
        </Grid>

        <Stack direction="row" justifyContent="space-between" spacing={0}>
          <Grid container spacing={2}>
            {options?.map((option, index) => (
              <Grid
                container
                mobile={12}
                tablet={6}
                justifyContent={{ desktop: 'space-between' }}
                pt={0}
                pl={3}
              >
                <CustomizedCheckbox
                  sx={{
                    ...menuTypography
                  }}
                  key={index}
                  control={<Checkbox />}
                  label={option}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Divider light />
        <Stack
          p={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <PrimaryIconButton
            onClick={handleClose}
            buttonTitle="Close"
            customStyle={TypographyButton}
          />
          <PrimaryIconButton
            onClick={handleClose}
            customStyle={applyFilterButton}
            buttonTitle="Apply"
          />
        </Stack>
      </Box>
    </ClickAwayListener>
  );
};
