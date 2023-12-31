import React from 'react';
import {
  Box,
  ClickAwayListener,
  FormControlLabel,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { applyFilterButton, checkboxSearchgroupContainer } from '../styles';
import { ExportCSVIcon, ExportPDFIcon, ExportXLSIcon } from '@/assets/svg';
import { PrimaryIconButton } from '@/components/Buttons';
import colors from '@/assets/colors';
import { primaryTitle } from '@/components/Confirmation/styles';

type Props = {
  handleClose: any;
};

const CustomizedRadioLabel = styled(FormControlLabel)(
  () => `
  .MuiFormControlLabel-label{
    line-height: 24px;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Averta Regular';
  }
`,
);

export const ExportData = ({ handleClose }: Props) => {
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          ...checkboxSearchgroupContainer,
          width: { mobile: '100%', desktop: '400px' },
          height: '390px',
          borderRadius: '12px',
          padding: '16px 24px',
        }}
      >
        <Box mb={2.5}>
          <Typography sx={{ ...primaryTitle }}>Export Report</Typography>
        </Box>
        <Divider sx={{ marginBottom: '30px' }} light />
        <FormControl>
          <FormLabel
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              color: `${colors.darkGrayishBlue}`,
              lineHeight: '20px',
            }}
          >
            EXPORT AS
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="pdf"
            name="radio-buttons-group"
          >
            <Stack direction="row">
              <CustomizedRadioLabel
                sx={{
                  fontSize: '12px',
                }}
                value="pdf"
                control={<Radio />}
                label="PDF File"
              />
              <Box mt={1}>
                <ExportPDFIcon />
              </Box>
            </Stack>

            <Stack direction="row">
              <CustomizedRadioLabel
                value="csv"
                control={<Radio />}
                label="CSV File"
              />
              <Box mt={1}>
                <ExportCSVIcon />
              </Box>
            </Stack>

            <Stack direction="row">
              <CustomizedRadioLabel
                value="excel"
                control={<Radio />}
                label="Excel File"
              />
              <Box mt={1}>
                <ExportXLSIcon />
              </Box>
            </Stack>
          </RadioGroup>
        </FormControl>

        <PrimaryIconButton
          onClick={handleClose}
          customStyle={{
            ...applyFilterButton,
            width: {mobile:'260px', desktop:'352px'},
            height: '52px',
            marginTop: '40px',
          }}
          buttonTitle="Export Report"
        />
      </Box>
    </ClickAwayListener>
  );
};
